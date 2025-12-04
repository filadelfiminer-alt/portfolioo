import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";

const ADMIN_CREDENTIALS = {
  username: "Filadelfi",
  password: "Filadelfipasswordexecute"
};

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      (req.session as any).user = {
        id: "admin",
        username: ADMIN_CREDENTIALS.username,
        isAdmin: true,
        isAuthenticated: true
      };
      res.json({ success: true, user: { username: ADMIN_CREDENTIALS.username, isAdmin: true } });
    } else {
      res.status(401).json({ success: false, message: "Неверный логин или пароль" });
    }
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Ошибка выхода" });
      } else {
        res.redirect("/");
      }
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const user = (req.session as any)?.user;
  
  if (user && user.isAuthenticated) {
    return next();
  }
  
  return res.status(401).json({ message: "Unauthorized" });
};

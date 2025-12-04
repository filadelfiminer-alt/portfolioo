import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { motion } from "framer-motion";
import { Lock, User, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/login", { username, password });
      const data = await response.json();
      
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        toast({
          title: "Добро пожаловать!",
          description: `Вы вошли как ${data.user.username}`,
        });
        setLocation("/admin");
      }
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Вход в портфолио</CardTitle>
            <CardDescription className="text-muted-foreground">
              Введите данные для управления портфолио
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Логин
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите логин"
                    className="pl-10 bg-background/50"
                    data-testid="input-username"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="pl-10 bg-background/50"
                    data-testid="input-password"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 border-0 shadow-lg shadow-violet-500/25"
                disabled={isLoading}
                data-testid="button-submit-login"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground" data-testid="button-back-home">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Вернуться на главную
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

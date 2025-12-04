import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ArrowRight, Sparkles, Code2, Palette, Rocket, Zap, Star, Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { icon: Code2, label: "Код", color: "from-violet-500 to-purple-600" },
  { icon: Palette, label: "Дизайн", color: "from-pink-500 to-rose-600" },
  { icon: Rocket, label: "Скорость", color: "from-cyan-500 to-blue-600" },
  { icon: Zap, label: "Энергия", color: "from-amber-500 to-orange-600" },
];

const features = [
  { title: "Магия анимаций", desc: "Каждый элемент оживает" },
  { title: "Уникальный стиль", desc: "Не как у всех" },
  { title: "Внимание к деталям", desc: "Каждый пиксель важен" },
];

export default function Landing() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (secretClicks >= 7) {
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 3000);
      setSecretClicks(0);
    }
  }, [secretClicks]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const flyInLeft = {
    hidden: { opacity: 0, x: -200, rotate: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  const flyInRight = {
    hidden: { opacity: 0, x: 200, rotate: 10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Secret Easter Egg Toast */}
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 animate-spin" />
            <span className="font-bold">Вы нашли секрет! Вы особенный!</span>
            <Heart className="h-6 w-6 text-pink-300" />
          </div>
        </motion.div>
      )}
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-2xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSecretClicks(prev => prev + 1)}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-7 w-7 text-violet-500" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Портфолио
            </span>
          </motion.div>
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="ghost" size="sm" asChild className="hover:bg-violet-500/10" data-testid="button-nav-about">
              <a href="/about">Обо мне</a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hover:bg-fuchsia-500/10" data-testid="button-nav-contact">
              <a href="/contact">Контакты</a>
            </Button>
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 border-0" data-testid="button-login">
                <a href="/api/login">Войти</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-screen flex items-center justify-center pt-16 relative"
        >
          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/30 to-transparent blur-xl"
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-transparent blur-xl"
            animate={{ 
              y: [0, 40, 0],
              x: [0, -20, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-4 relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 mb-8 cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-violet-400" />
                </motion.div>
                <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Креативное портфолио
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9]"
              >
                <motion.span 
                  className="block"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                    backgroundImage: "linear-gradient(90deg, #8b5cf6, #d946ef, #06b6d4, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Покажи миру
                </motion.span>
                <span className="block mt-2">
                  свой{" "}
                  <motion.span 
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative z-10">талант</span>
                    <motion.span 
                      className="absolute -inset-2 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-lg blur-lg -z-10"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Создавай. Вдохновляй. Удивляй.
                <br />
                <span className="text-violet-400">Твоё портфолио — твоя история.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-5"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    asChild 
                    className="px-10 py-7 text-lg bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 border-0 shadow-lg shadow-violet-500/25" 
                    data-testid="button-get-started"
                  >
                    <a href="/api/login">
                      Начать сейчас
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    asChild 
                    className="px-10 py-7 text-lg border-2 border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-500/10" 
                    data-testid="button-view-gallery"
                  >
                    <a href="/gallery">Смотреть галерею</a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-violet-500/50 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-3 rounded-full bg-violet-500"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="text-center mb-20"
            >
              <motion.h2 
                variants={flyInLeft}
                className="text-4xl md:text-6xl font-black mb-6"
              >
                Мои{" "}
                <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  суперсилы
                </span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  variants={i % 2 === 0 ? flyInLeft : flyInRight}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm cursor-pointer overflow-hidden"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <skill.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{skill.label}</h3>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid lg:grid-cols-3 gap-8"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ y: -20, scale: 1.02 }}
                  className="group relative p-10 rounded-3xl bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 border border-violet-500/20 overflow-hidden"
                >
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-3xl group-hover:scale-150 transition-transform duration-700"
                  />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                      className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 border border-violet-500/30 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              <motion.h2
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                className="relative z-10 text-4xl md:text-5xl font-black mb-6"
              >
                Готов{" "}
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  удивить мир?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
              >
                Создай портфолио, которое запомнят. Покажи свои лучшие работы красиво.
              </motion.p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <Button 
                  size="lg" 
                  asChild 
                  className="px-12 py-8 text-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 border-0 shadow-2xl shadow-violet-500/30"
                  data-testid="button-create-portfolio"
                >
                  <a href="/api/login">
                    Создать портфолио
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="border-t border-violet-500/10 py-10 relative z-10"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer"
            onClick={() => setSecretClicks(prev => prev + 1)}
          >
            <Sparkles className="h-5 w-5 text-violet-500" />
            <span className="font-medium">Сделано с любовью</span>
            <Heart className="h-4 w-4 text-pink-500" />
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

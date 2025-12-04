import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-200/40 via-purple-100/30 to-fuchsia-200/40 dark:from-violet-950/60 dark:via-purple-950/50 dark:to-fuchsia-950/60" />
      
      {/* Animated mesh gradient - follows cursor */}
      <div 
        className="mesh-bg"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}
      />
      
      {/* Floating orb 1 - follows cursor */}
      <div 
        className="orb orb-1"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`
        }}
      />
      
      {/* Floating orb 2 - follows cursor opposite direction */}
      <div 
        className="orb orb-2"
        style={{
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`
        }}
      />
      
      {/* Floating orb 3 - follows cursor */}
      <div 
        className="orb orb-3"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 50}px), calc(-50% + ${mousePos.y * 50}px))`
        }}
      />
      
      {/* Glowing lines - follow cursor */}
      <div 
        className="glow-line glow-line-1"
        style={{
          transform: `rotate(-12deg) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
        }}
      />
      <div 
        className="glow-line glow-line-2"
        style={{
          transform: `rotate(15deg) translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`
        }}
      />
      
      {/* Gentle floating particles */}
      <div className="particles-container">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${(i % 5) + 1}`} 
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${10 + (i * 11) % 80}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${20 + (i % 5) * 3}s`
            }} 
          />
        ))}
      </div>
      
      <style>{`
        .mesh-bg {
          position: absolute;
          inset: -10%;
          background: 
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(167, 139, 250, 0.3), transparent 60%),
            radial-gradient(ellipse 70% 50% at 70% 70%, rgba(192, 132, 252, 0.25), transparent 60%),
            radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139, 92, 246, 0.2), transparent 60%);
          animation: mesh-shift 30s ease-in-out infinite;
          transition: transform 0.15s ease-out;
        }
        
        .dark .mesh-bg {
          background: 
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(139, 92, 246, 0.4), transparent 60%),
            radial-gradient(ellipse 70% 50% at 70% 70%, rgba(167, 139, 250, 0.3), transparent 60%),
            radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124, 58, 237, 0.25), transparent 60%);
        }
        
        @keyframes mesh-shift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(15deg); }
        }
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          transition: transform 0.15s ease-out;
        }
        
        .orb-1 {
          width: 500px;
          height: 500px;
          top: -10%;
          left: -5%;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%);
          animation: float-1 25s ease-in-out infinite;
        }
        
        .orb-2 {
          width: 400px;
          height: 400px;
          bottom: -5%;
          right: -5%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.35) 0%, transparent 70%);
          animation: float-2 30s ease-in-out infinite;
        }
        
        .orb-3 {
          width: 350px;
          height: 350px;
          top: 40%;
          left: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          animation: float-3 22s ease-in-out infinite;
        }
        
        .dark .orb-1 { 
          background: radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%);
        }
        .dark .orb-2 { 
          background: radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%);
        }
        .dark .orb-3 { 
          background: radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%);
        }
        
        @keyframes float-1 {
          0%, 100% { margin-left: 0; margin-top: 0; }
          25% { margin-left: 30px; margin-top: 20px; }
          50% { margin-left: 15px; margin-top: 40px; }
          75% { margin-left: -15px; margin-top: 20px; }
        }
        
        @keyframes float-2 {
          0%, 100% { margin-right: 0; margin-bottom: 0; }
          33% { margin-right: -25px; margin-bottom: -20px; }
          66% { margin-right: -40px; margin-bottom: -10px; }
        }
        
        @keyframes float-3 {
          0%, 100% { margin-left: 0; margin-top: 0; }
          50% { margin-left: 25px; margin-top: -30px; }
        }
        
        .glow-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.5), rgba(192, 132, 252, 0.5), transparent);
          opacity: 0.6;
          transition: transform 0.15s ease-out;
        }
        
        .dark .glow-line {
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), rgba(167, 139, 250, 0.6), transparent);
          opacity: 0.7;
        }
        
        .glow-line-1 {
          width: 40%;
          top: 35%;
          left: 15%;
          animation: line-pulse-1 8s ease-in-out infinite;
        }
        
        .glow-line-2 {
          width: 30%;
          top: 65%;
          right: 20%;
          animation: line-pulse-2 10s ease-in-out infinite;
        }
        
        @keyframes line-pulse-1 {
          0%, 100% { opacity: 0.4; width: 40%; }
          50% { opacity: 0.8; width: 45%; }
        }
        
        @keyframes line-pulse-2 {
          0%, 100% { opacity: 0.3; width: 30%; }
          50% { opacity: 0.7; width: 35%; }
        }
        
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: particle-float 25s ease-in-out infinite;
        }
        
        .particle-1 { background: rgba(167, 139, 250, 0.7); width: 5px; height: 5px; }
        .particle-2 { background: rgba(192, 132, 252, 0.6); width: 4px; height: 4px; }
        .particle-3 { background: rgba(139, 92, 246, 0.7); width: 6px; height: 6px; }
        .particle-4 { background: rgba(167, 139, 250, 0.6); width: 4px; height: 4px; }
        .particle-5 { background: rgba(124, 58, 237, 0.5); width: 5px; height: 5px; }
        
        .dark .particle-1 { background: rgba(167, 139, 250, 0.6); }
        .dark .particle-2 { background: rgba(192, 132, 252, 0.5); }
        .dark .particle-3 { background: rgba(139, 92, 246, 0.6); }
        .dark .particle-4 { background: rgba(167, 139, 250, 0.5); }
        .dark .particle-5 { background: rgba(124, 58, 237, 0.6); }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translate(40px, -50px) scale(1);
            opacity: 0.6;
          }
          75% {
            transform: translate(20px, -70px) scale(1.3);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

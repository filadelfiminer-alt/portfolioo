import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient layer - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-cyan-500/20 dark:from-violet-600/30 dark:via-fuchsia-600/25 dark:to-cyan-600/30" />
      
      {/* Animated gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      
      <style>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 600px;
          height: 600px;
          top: -200px;
          left: -100px;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%);
          opacity: 0.6;
          animation: float-orb-1 25s ease-in-out infinite;
        }
        
        .dark .orb-1 {
          opacity: 0.4;
        }
        
        .orb-2 {
          width: 500px;
          height: 500px;
          bottom: -150px;
          right: -100px;
          background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #67e8f9 100%);
          opacity: 0.5;
          animation: float-orb-2 30s ease-in-out infinite;
        }
        
        .dark .orb-2 {
          opacity: 0.35;
        }
        
        .orb-3 {
          width: 400px;
          height: 400px;
          top: 40%;
          left: 50%;
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%);
          opacity: 0.4;
          animation: float-orb-3 20s ease-in-out infinite;
        }
        
        .dark .orb-3 {
          opacity: 0.3;
        }
        
        .orb-4 {
          width: 350px;
          height: 350px;
          top: 20%;
          right: 20%;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          opacity: 0.35;
          animation: float-orb-4 22s ease-in-out infinite;
        }
        
        .dark .orb-4 {
          opacity: 0.25;
        }
        
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(80px, 40px) scale(1.1); }
          50% { transform: translate(40px, 80px) scale(0.95); }
          75% { transform: translate(-40px, 40px) scale(1.05); }
        }
        
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-60px, -40px) scale(1.05); }
          50% { transform: translate(-80px, -80px) scale(1.1); }
          75% { transform: translate(-30px, -60px) scale(0.95); }
        }
        
        @keyframes float-orb-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-40%, -60%) scale(1.15); }
          66% { transform: translate(-60%, -40%) scale(0.9); }
        }
        
        @keyframes float-orb-4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-50px, 50px) scale(1.1) rotate(10deg); }
        }
        
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          border-radius: 50%;
          opacity: 0.6;
          animation: float-particle 15s ease-in-out infinite;
        }
        
        .dark .particle {
          opacity: 0.4;
        }
        
        .particle-1 { left: 10%; top: 20%; animation-delay: 0s; animation-duration: 18s; }
        .particle-2 { left: 20%; top: 80%; animation-delay: -2s; animation-duration: 22s; }
        .particle-3 { left: 30%; top: 40%; animation-delay: -4s; animation-duration: 16s; }
        .particle-4 { left: 40%; top: 60%; animation-delay: -6s; animation-duration: 20s; }
        .particle-5 { left: 50%; top: 30%; animation-delay: -8s; animation-duration: 24s; }
        .particle-6 { left: 60%; top: 70%; animation-delay: -10s; animation-duration: 19s; }
        .particle-7 { left: 70%; top: 50%; animation-delay: -12s; animation-duration: 21s; }
        .particle-8 { left: 80%; top: 25%; animation-delay: -14s; animation-duration: 17s; }
        .particle-9 { left: 90%; top: 85%; animation-delay: -1s; animation-duration: 23s; }
        .particle-10 { left: 15%; top: 55%; animation-delay: -3s; animation-duration: 25s; }
        .particle-11 { left: 25%; top: 15%; animation-delay: -5s; animation-duration: 18s; }
        .particle-12 { left: 35%; top: 75%; animation-delay: -7s; animation-duration: 20s; }
        .particle-13 { left: 45%; top: 45%; animation-delay: -9s; animation-duration: 16s; }
        .particle-14 { left: 55%; top: 90%; animation-delay: -11s; animation-duration: 22s; }
        .particle-15 { left: 65%; top: 35%; animation-delay: -13s; animation-duration: 19s; }
        .particle-16 { left: 75%; top: 65%; animation-delay: -15s; animation-duration: 21s; }
        .particle-17 { left: 85%; top: 10%; animation-delay: -2s; animation-duration: 17s; }
        .particle-18 { left: 95%; top: 50%; animation-delay: -4s; animation-duration: 24s; }
        .particle-19 { left: 5%; top: 95%; animation-delay: -6s; animation-duration: 20s; }
        .particle-20 { left: 50%; top: 5%; animation-delay: -8s; animation-duration: 18s; }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translate(30px, -40px) scale(1.5);
            opacity: 0.8;
          }
          50% { 
            transform: translate(-20px, -80px) scale(1);
            opacity: 0.4;
          }
          75% { 
            transform: translate(40px, -40px) scale(1.3);
            opacity: 0.7;
          }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}

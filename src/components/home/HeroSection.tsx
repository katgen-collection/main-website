import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, MotionValue } from 'framer-motion';
import { Download, ArrowDown, Code2, Sparkles, Zap, LucideIcon } from 'lucide-react';

interface FloatingParticleProps {
  delay: number;
  duration: number;
  x: number;
  y: number;
}

interface GlowOrbProps {
  size: number;
  color: string;
  x: number;
  y: number;
  delay: number;
}

interface MatrixCharProps {
  char: string;
  x: number;
  delay: number;
}

interface FloatingIconProps {
  Icon: LucideIcon;
  color: string;
  position: string;
  delay: number;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay, duration, x, y }) => (
  <motion.div
    className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 180, 360],
      opacity: [0.3, 0.8, 0.3]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const GlowOrb: React.FC<GlowOrbProps> = ({ size, color, x, y, delay }) => (
  <motion.div
    className="absolute rounded-full blur-xl opacity-20"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      background: `radial-gradient(circle, ${color}, transparent)`,
      left: `${x}%`,
      top: `${y}%`
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const MatrixChar: React.FC<MatrixCharProps> = ({ char, x, delay }) => (
  <motion.div
    className="absolute text-purple-400/20 text-xs font-mono"
    style={{ left: `${x}%` }}
    initial={{ y: -100, opacity: 0 }}
    animate={{ 
      y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {char}
  </motion.div>
);

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, color, position, delay }) => (
  <motion.div
    className={`absolute ${position} p-4 rounded-full glass-morphism`}
    style={{ backgroundColor: `${color}10` }}
    animate={{
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    whileHover={{ scale: 1.1, rotate: 15 }}
  >
    <Icon className="w-8 h-8" style={{ color }} />
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number]
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -3,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const Hero: React.FC = () => {
  
  // Mouse tracking
  const mouseX: MotionValue<number> = useMotionValue(50);
  const mouseY: MotionValue<number> = useMotionValue(50);
  
  // Spring values for smooth animation
  const springX: MotionValue<number> = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY: MotionValue<number> = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      const heroElement = document.getElementById('hero-section');
      const rect = heroElement?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Update motion values instead of state for smoother animation
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Matrix rain effect characters
  const matrixChars: React.ReactElement[] = [...Array(30)].map((_, i) => (
    <MatrixChar
      key={i}
      char={String.fromCharCode(65 + Math.floor(Math.random() * 26))}
      x={Math.random() * 100}
      delay={Math.random() * 8}
    />
  ));

  // Glowing floating particles
  const floatingParticles: React.ReactElement[] = [...Array(25)].map((_, i) => (
    <FloatingParticle
      key={i}
      delay={Math.random() * 3}
      duration={4 + Math.random() * 4}
      x={Math.random() * 100}
      y={Math.random() * 100}
    />
  ));

  return (
    <>
      <style jsx>{`
        .glass-morphism {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff 0%, #a855f7 50%, #ffffff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <motion.section
        id="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-black"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${springX.get()}% ${springY.get()}%, rgba(168, 85, 247, 0.15), transparent 50%)`
          }}
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {matrixChars}
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {floatingParticles}
        </div>

        {/* Glowing Orbs */}
        <GlowOrb size={200} color="#a855f7" x={10} y={20} delay={0} />
        <GlowOrb size={150} color="#ec4899" x={80} y={70} delay={1} />
        <GlowOrb size={100} color="#3b82f6" x={60} y={10} delay={2} />
        <GlowOrb size={120} color="#10b981" x={20} y={80} delay={1.5} />

        {/* Main Content */}
        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
          >
            {/* Floating Icons */}
            <FloatingIcon 
              Icon={Code2} 
              color="#a855f7" 
              position="-top-20 -left-20" 
              delay={0} 
            />
            <FloatingIcon 
              Icon={Sparkles} 
              color="#ec4899" 
              position="-top-10 -right-32" 
              delay={1} 
            />
            <FloatingIcon 
              Icon={Zap} 
              color="#3b82f6" 
              position="top-40 -right-20" 
              delay={2} 
            />

            {/* Main Content Container */}
            <div className="space-y-12">
              {/* Main Heading */}
              <motion.div variants={itemVariants}>
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "backOut" }}
                >
                  <motion.span 
                    className="block text-white/90 mb-4"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Hi, I&apos;m
                  </motion.span>
                  <motion.span 
                    className="block shimmer-text text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Mikhail
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="glass-morphism rounded-2xl p-6 md:p-8 max-w-3xl mx-auto"
              >
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Crafting secure, reliable, and scalable digital experiences.
                </motion.p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.a
                  href="#projects"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group relative px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg overflow-hidden shadow-lg"
                >
                  <motion.span 
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    View My Work
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                
                <motion.a
                  href="https://drive.google.com/file/d/1pISl6NVG0hZe0xVmee6-dYzRP2Sw6Lqo/view?usp=sharing"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="group px-12 py-4 glass-morphism rounded-full text-white font-semibold text-lg flex items-center gap-3 border border-purple-400/30 shadow-lg"
                >
                  <motion.div
                    whileHover={{ y: -2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.div>
                  Download Resume
                </motion.a>
              </motion.div>

              <motion.div
                className="flex flex-col items-center pt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <motion.span 
                  className="text-gray-400 text-sm mb-4 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Scroll to explore
                </motion.span>
                <motion.div 
                  className="p-3 rounded-full glass-morphism border border-purple-400/30 cursor-pointer"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowDown className="w-6 h-6 text-purple-400" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Grid Pattern Overlay */}
        <motion.div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </motion.div>
      </motion.section>
    </>
  );
};

export default Hero;
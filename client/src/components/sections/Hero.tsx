import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663209856095/7VQnJvMrA96NuiFaSE9E2T/hero-bg-abstract-LNsJAQih9BmpC3BV6y2BBp.webp";

const roles = ["Full Stack", "Frontend", "Backend", "Mobile"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setParallaxY(window.scrollY * 0.35);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${parallaxY}px) scale(1.15)` }}
      >
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/60 via-[#0B0B0B]/40 to-[#0B0B0B]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium">
              Disponível para novos projetos
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] mb-6"
          >
            Desenvolvedor{" "}
            <span className="relative inline-block">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="text-gradient"
              >
                {roles[roleIndex]}
              </motion.span>
            </span>
            <br />
            <span className="text-white/80">focado em criar sistemas</span>
            <br />
            <span className="text-white/80">que </span>
            <span className="text-white">resolvem problemas reais.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-white/40 max-w-xl mb-10 leading-relaxed"
          >
            React, Next.js, Node.js e TypeScript. Construo aplicações completas
            — do banco de dados à interface — com foco em performance, UX e
            resultados mensuráveis.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <a
              href="#projetos"
              className="group px-6 py-3 bg-[#0A84FF] text-white font-semibold text-sm rounded-lg hover:bg-[#0A84FF]/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(10,132,255,0.3)] flex items-center gap-2"
            >
              Ver projetos
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contato"
              className="px-6 py-3 text-white/70 font-medium text-sm rounded-lg border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
            >
              Entrar em contato
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/Makadeshbr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/allanfelipefdev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <span className="text-xs text-white/20 font-mono">
              Brasil — Remoto
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

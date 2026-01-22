'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

// Componente do Terminal Animado
function AnimatedTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);

  const terminalLines = [
    { type: 'command', text: 'allan --whoami' },
    { type: 'output', text: 'Desenvolvedor Full Stack & Mobile' },
    { type: 'command', text: 'allan --stack' },
    { type: 'output', text: 'React · Next.js · React Native · Node.js · TypeScript' },
    { type: 'command', text: 'allan --status' },
    { type: 'output', text: '✓ Disponível para novos projetos' },
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      const delay = line.type === 'command' ? 50 : 30;
      let charIndex = 0;

      const interval = setInterval(() => {
        if (charIndex <= line.text.length) {
          setDisplayedText((prev) => {
            const newLines = [...prev];
            newLines[currentLine] = line.text.slice(0, charIndex);
            return newLines;
          });
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setCurrentLine((prev) => prev + 1), 500);
        }
      }, delay);

      return () => clearInterval(interval);
    }
  }, [currentLine]);

  return (
    <motion.div
      className="w-full max-w-xl bg-[#0A0A0A] rounded-lg overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-[#F87171]" />
        <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
        <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
        <span className="ml-3 text-xs text-[#6B6B6B] font-mono">terminal — allan@dev</span>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[200px]">
        {terminalLines.map((line, index) => (
          <div key={index} className={`mb-2 ${index > currentLine ? 'hidden' : ''}`}>
            {line.type === 'command' ? (
              <div className="flex items-center gap-2">
                <span className="text-[#0D9488]">❯</span>
                <span className="text-[#FAFAF8]">{displayedText[index] || ''}</span>
                {index === currentLine && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#0D9488]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </div>
            ) : (
              <div className="text-[#A1A1A1] pl-5">{displayedText[index] || ''}</div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient Orb */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0D9488]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#0D9488]/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D9488]/10 border border-[#0D9488]/20 rounded-full mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
              </span>
              <span className="font-mono text-xs text-[#0D9488] font-medium">
                Disponível para projetos
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Transformo ideias em{' '}
              <span className="relative inline-block">
                <span className="text-gradient">produtos digitais</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path
                    d="M0 4 Q50 8 100 4 T200 4"
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{' '}
              que funcionam.
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-[#6B6B6B] leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Desenvolvimento de landing pages, sites, aplicativos mobile e automações.
              Do conceito à entrega — sem dor de cabeça.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.a
                href="#contato"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#FAFAF8] font-mono text-sm font-medium hover:bg-[#0D9488] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Iniciar Projeto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#projetos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#1A1A1A] font-mono text-sm font-medium border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Projetos
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="font-mono text-xs text-[#A1A1A1]">Conecte-se:</span>
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: 'https://github.com/Makadeshbr', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/allanfelipefdev', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:allanwesy17@gmail.com', label: 'Email' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#6B6B6B] hover:text-[#0D9488] transition-colors"
                    whileHover={{ y: -2 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Terminal */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <AnimatedTerminal />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-xs text-[#A1A1A1]">Scroll</span>
        <motion.div
          className="w-5 h-8 border border-[#A1A1A1] rounded-full flex justify-center pt-2"
          initial={{ opacity: 0.5 }}
        >
          <motion.div
            className="w-1 h-2 bg-[#0D9488] rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

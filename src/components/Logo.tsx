'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColor = variant === 'dark' ? 'text-[#1A1A1A]' : 'text-[#FAFAF8]';
  const accentColor = 'text-[#0D9488]';

  return (
    <motion.a
      href="/"
      className={`font-mono font-bold ${sizeClasses[size]} ${textColor} flex items-center gap-0.5 no-underline`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={accentColor}>&lt;</span>
      <span>AF</span>
      <span className={accentColor}>/&gt;</span>
      <motion.span
        className={`inline-block w-[2px] h-[1em] ${variant === 'dark' ? 'bg-[#1A1A1A]' : 'bg-[#FAFAF8]'} ml-0.5`}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
      />
    </motion.a>
  );
}

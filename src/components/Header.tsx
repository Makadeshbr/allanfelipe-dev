'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#FAFAF8]/95 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo variant="dark" size="md" />

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#0D9488] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <a
              href="#contato"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-[#FAFAF8] font-mono text-sm font-medium rounded hover:bg-[#0D9488] transition-all duration-300"
            >
              <span>Iniciar Projeto</span>
              <span className="text-[#0D9488] hover:text-white transition-colors">→</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1A1A1A]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-20 left-0 right-0 bg-[#FAFAF8] border-b border-black/10 shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="max-w-[1200px] mx-auto px-6 py-8">
                <ul className="flex flex-col gap-6">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="font-mono text-lg text-[#1A1A1A] hover:text-[#0D9488] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-[#0D9488] mr-2">0{index + 1}.</span>
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="#contato"
                  className="mt-8 w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#1A1A1A] text-[#FAFAF8] font-mono text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Iniciar Projeto →
                </motion.a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

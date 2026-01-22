'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';

const footerLinks = {
  navegacao: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ],
  servicos: [
    { label: 'Landing Pages', href: '#servicos' },
    { label: 'Sites & Sistemas', href: '#servicos' },
    { label: 'Apps Mobile', href: '#servicos' },
    { label: 'Automações', href: '#servicos' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Makadeshbr', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/allanfelipefdev', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/allan_felippef', label: 'Instagram' },
  { icon: Mail, href: 'mailto:allanwesy17@gmail.com', label: 'Email' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="lg" />
            <p className="mt-6 text-[#A1A1A1] leading-relaxed max-w-md">
              Desenvolvimento de soluções digitais sob medida.
              Landing pages, sites, aplicativos mobile e automações
              que geram resultados reais para o seu negócio.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/5 text-[#A1A1A1] hover:bg-[#0D9488] hover:text-white transition-all"
                    whileHover={{ y: -2 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider mb-6">
              Navegação
            </h4>
            <ul className="space-y-4">
              {footerLinks.navegacao.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#A1A1A1] hover:text-[#0D9488] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider mb-6">
              Serviços
            </h4>
            <ul className="space-y-4">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#A1A1A1] hover:text-[#0D9488] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6B6B6B]">
              © {new Date().getFullYear()} Allan Felipe. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-6">
              <span className="text-sm text-[#6B6B6B]">
                Feito com{' '}
                <span className="text-[#0D9488]">♥</span>
                {' '}e muito café
              </span>

              {/* Scroll to top */}
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 flex items-center justify-center bg-white/5 text-[#A1A1A1] hover:bg-[#0D9488] hover:text-white transition-all"
                whileHover={{ y: -2 }}
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

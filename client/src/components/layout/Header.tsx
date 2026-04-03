import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A84FF] to-[#0066CC] flex items-center justify-center font-bold text-white text-sm font-[family-name:var(--font-display)] group-hover:shadow-[0_0_20px_rgba(10,132,255,0.4)] transition-shadow duration-300">
            AF
          </div>
          <span className="font-[family-name:var(--font-display)] font-semibold text-white/90 text-sm tracking-tight hidden sm:block">
            allan<span className="text-[#0A84FF]">felipe</span>.dev
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors duration-300 font-medium rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-[#0A84FF] rounded-lg hover:bg-[#0A84FF]/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,132,255,0.3)]"
          >
            Fale comigo
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass border-t border-white/[0.06] overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contato"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 text-sm font-semibold text-white bg-[#0A84FF] rounded-lg text-center"
              >
                Fale comigo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

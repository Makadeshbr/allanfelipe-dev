import { Github, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0A84FF] to-[#0066CC] flex items-center justify-center text-white text-[10px] font-bold font-[family-name:var(--font-display)]">
            AF
          </div>
          <span className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Allan Felipe. Todos os direitos reservados.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Makadeshbr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/20 hover:text-white/60 transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/allanfelipefdev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/20 hover:text-white/60 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://wa.me/5514991618312"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/20 hover:text-white/60 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

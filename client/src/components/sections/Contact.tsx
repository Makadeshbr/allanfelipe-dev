import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "LinkedIn",
    desc: "Vamos nos conectar",
    href: "https://www.linkedin.com/in/allanfelipefdev",
    icon: Linkedin,
    accent: "group-hover:text-[#0A66C2]",
  },
  {
    label: "Email",
    desc: "allanwesy17@gmail.com",
    href: "mailto:allanwesy17@gmail.com",
    icon: Mail,
    accent: "group-hover:text-[#0A84FF]",
  },
  {
    label: "WhatsApp",
    desc: "+55 (14) 99161-8312",
    href: "https://wa.me/5514991618312?text=Ol%C3%A1%20Allan%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.",
    icon: MessageCircle,
    accent: "group-hover:text-[#25D366]",
  },
  {
    label: "GitHub",
    desc: "github.com/Makadeshbr",
    href: "https://github.com/Makadeshbr",
    icon: Github,
    accent: "group-hover:text-white",
  },
];

export default function Contact() {
  return (
    <section id="contato" className="py-24 lg:py-32 relative border-t border-white/[0.04]">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#0A84FF] text-xs font-mono uppercase tracking-[0.3em] mb-3 block">
              Contato
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
              Vamos trabalhar
              <br />
              <span className="text-gradient">juntos?</span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
              Estou disponível para projetos freelance, posições CLT ou PJ.
              Respondo em até 24 horas.
            </p>
          </motion.div>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group p-5 rounded-xl glass-card hover:border-white/12 transition-all duration-300 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 ${link.accent} transition-colors duration-300`}>
                <link.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors block">
                  {link.label}
                </span>
                <span className="text-xs text-white/30 truncate block">
                  {link.desc}
                </span>
              </div>
              <ArrowUpRight size={16} className="text-white/10 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

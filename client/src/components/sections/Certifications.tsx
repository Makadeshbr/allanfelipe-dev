import { motion } from "framer-motion";
import { Github, Code2, Zap, Award } from "lucide-react";

const certifications = [
  {
    icon: Github,
    title: "GitHub Contributor",
    description: "Contribuições ativas em projetos open source",
    color: "#333333",
  },
  {
    icon: Code2,
    title: "Full Stack Developer",
    description: "Certificação em desenvolvimento full stack",
    color: "#0A84FF",
  },
  {
    icon: Zap,
    title: "Performance Expert",
    description: "Especialização em otimização de performance",
    color: "#FFD700",
  },
  {
    icon: Award,
    title: "Best Practices",
    description: "Arquitetura e padrões de design avançados",
    color: "#00D4FF",
  },
];

export default function Certifications() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-[#0A84FF] text-xs font-mono uppercase tracking-[0.3em] mb-3 block">
            Credibilidade
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Certificações e Badges
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center hover:border-white/10 transition-all duration-500 group"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${cert.color}20`, color: cert.color }}
                >
                  <Icon size={32} />
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-display)] font-bold text-white mb-2">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-xs leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card rounded-xl p-8 text-center"
        >
          <p className="text-white/60 mb-4">
            Sempre aprendendo e me mantendo atualizado com as melhores práticas da indústria.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/Makadeshbr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/[0.04] transition-all"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/[0.04] transition-all"
            >
              <Code2 size={14} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Descoberta",
    description: "Entendo profundamente o problema de negócio, objetivos e restrições através de conversas detalhadas.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Planejamento",
    description: "Defino arquitetura, tecnologias e roadmap. Tudo documentado e alinhado com você.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description: "Construo com qualidade, testes e boas práticas. Você acompanha o progresso em tempo real.",
    icon: "⚙️",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Deploy, documentação e treinamento. Suporte pós-lançamento garantido.",
    icon: "🚀",
  },
];

export default function Process() {
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
          className="mb-16 max-w-2xl"
        >
          <span className="text-[#0A84FF] text-xs font-mono uppercase tracking-[0.3em] mb-3 block">
            Metodologia
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            Como trabalhamos
          </h2>
          <p className="text-white/40 text-lg">
            Um processo transparente, colaborativo e focado em resultados mensuráveis.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-6 w-12 h-0.5 bg-gradient-to-r from-[#0A84FF]/50 to-transparent" />
              )}

              {/* Card */}
              <div className="glass-card rounded-xl p-8 hover:border-white/10 transition-all duration-500">
                {/* Number */}
                <div className="text-5xl font-[family-name:var(--font-display)] font-bold text-[#0A84FF]/20 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Checkmarks */}
                <div className="space-y-2">
                  {["Planejamento detalhado", "Comunicação clara", "Qualidade garantida"].map(
                    (item, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-white/40">
                        <CheckCircle2 size={14} className="text-[#0A84FF]" />
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 mb-6">
            Pronto para começar um projeto? Vamos conversar!
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#0A84FF] rounded-lg hover:bg-[#0A84FF]/90 transition-all duration-300">
            Agendar Conversa
          </button>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

const strengths = [
  {
    title: "Resolução de Problemas",
    desc: "Entendo o problema de negócio antes de escrever a primeira linha de código. Cada feature tem um porquê.",
  },
  {
    title: "Full Stack Real",
    desc: "Do schema do banco de dados à animação do botão. Construo sistemas completos sem depender de terceiros.",
  },
  {
    title: "Código Limpo",
    desc: "TypeScript, componentização, testes. Código que outros devs conseguem ler, manter e escalar.",
  },
  {
    title: "Entrega Consistente",
    desc: "Prazos realistas, comunicação clara e entregas incrementais. Sem surpresas no final do sprint.",
  },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 lg:py-32 relative border-t border-white/[0.04]">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#0A84FF] text-xs font-mono uppercase tracking-[0.3em] mb-3 block">
              Sobre
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6">
              Quem está por trás
              <br />
              <span className="text-white/40">do código.</span>
            </h2>

            <div className="space-y-4 text-white/45 text-sm sm:text-base leading-relaxed">
              <p>
                Sou <strong className="text-white/80">Allan Felipe</strong>, desenvolvedor Full Stack baseado no Brasil.
                Trabalho com desenvolvimento web e mobile há mais de 2 anos, com foco em criar
                sistemas que resolvem problemas reais de negócios.
              </p>
              <p>
                Minha abordagem é pragmática: entendo o problema, desenho a solução mais simples
                que funciona, e itero com base em feedback real. Não acredito em over-engineering
                nem em soluções que parecem bonitas mas não entregam valor.
              </p>
              <p>
                Atualmente trabalho com <strong className="text-white/80">React, Next.js, Node.js e TypeScript</strong> como
                stack principal, mas já naveguei por Python, React Native e diversas ferramentas
                de banco de dados. O que importa é escolher a ferramenta certa para cada problema.
              </p>
            </div>
          </motion.div>

          {/* Right - Strengths */}
          <div className="space-y-4">
            {strengths.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-5 rounded-xl glass-card hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#0A84FF]/10 border border-[#0A84FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0A84FF]/20 group-hover:border-[#0A84FF]/30 transition-all duration-300">
                    <span className="text-[#0A84FF] text-xs font-mono font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-sm mb-1 group-hover:text-[#0A84FF] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

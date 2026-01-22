'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Rocket, Users, Coffee } from 'lucide-react';

const techStack = {
  frontend: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Hono', 'Express', 'PostgreSQL', 'Drizzle ORM'],
  tools: ['Git', 'Docker', 'Vercel', 'Railway', 'Figma'],
};

const values = [
  {
    icon: Code2,
    title: 'Código de Qualidade',
    description: 'Sem gambiarras. Código limpo, documentado e seguindo as melhores práticas do mercado.',
  },
  {
    icon: Rocket,
    title: 'Entrega Rápida',
    description: 'Processos otimizados e ferramentas próprias para entregar mais rápido sem sacrificar qualidade.',
  },
  {
    icon: Users,
    title: 'Comunicação Clara',
    description: 'Você sempre sabe o status do projeto. Atualizações frequentes e sem surpresas.',
  },
  {
    icon: Coffee,
    title: 'Suporte Contínuo',
    description: 'O projeto não termina na entrega. Ofereço suporte e manutenção para garantir seu sucesso.',
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-[#0A0A0A] text-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
              <span className="w-8 h-[1px] bg-[#0D9488]" />
              Sobre mim
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              Mais que código:{' '}
              <span className="text-gradient">soluções reais</span>
            </h2>

            <div className="space-y-6 text-[#A1A1A1] leading-relaxed">
              <p>
                Sou Allan Felipe, desenvolvedor full stack e mobile. Atualmente cursando
                faculdade de tecnologia e construindo experiência através de projetos reais
                que geram valor para negócios.
              </p>

              <p>
                Diferencial? Tenho minha própria plataforma de backend
                (<span className="text-[#0D9488]">Aether</span>) — isso significa entregas
                mais rápidas, custos menores e uma base técnica sólida para qualquer projeto.
              </p>

              <p>
                Meu foco é entregar soluções robustas e bem arquitetadas.
                Cada linha de código é pensada para performance, segurança
                e fácil manutenção — sem gambiarras ou atalhos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              {[
                { value: '2+', label: 'Anos de experiência' },
                { value: '15+', label: 'Projetos entregues' },
                { value: '100%', label: 'Clientes satisfeitos' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block font-display text-3xl lg:text-4xl font-bold text-[#0D9488]">
                    {stat.value}
                  </span>
                  <span className="text-sm text-[#6B6B6B]">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Tech & Values */}
          <div>
            {/* Tech Stack */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display text-xl font-bold mb-6">Stack Tecnológico</h3>

              <div className="space-y-6">
                {Object.entries(techStack).map(([category, techs]) => (
                  <div key={category}>
                    <span className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider mb-3 block">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-white/5 border border-white/10 font-mono text-sm text-[#FAFAF8] hover:border-[#0D9488]/50 hover:bg-[#0D9488]/10 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display text-xl font-bold mb-6">Como eu trabalho</h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-[#0D9488]/10 mb-4 group-hover:bg-[#0D9488]/20 transition-colors">
                        <Icon className="w-5 h-5 text-[#0D9488]" />
                      </div>
                      <h4 className="font-display font-bold text-white mb-2">
                        {value.title}
                      </h4>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

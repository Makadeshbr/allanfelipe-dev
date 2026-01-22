'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Clock, Shield, Zap, CheckCircle } from 'lucide-react';

const results = [
  {
    project: 'RotaFrete',
    type: 'Aplicativo Mobile',
    icon: Users,
    metrics: [
      { value: '500+', label: 'Usuários ativos' },
      { value: '2.5k', label: 'Fretes realizados' },
      { value: '4.8', label: 'Avaliação na loja' },
    ],
    description: 'App de logística conectando motoristas a cargas em tempo real.',
    color: '#0D9488',
  },
  {
    project: 'Aether Platform',
    type: 'Backend-as-a-Service',
    icon: Shield,
    metrics: [
      { value: '99.9%', label: 'Uptime garantido' },
      { value: '12+', label: 'APIs em produção' },
      { value: '<100ms', label: 'Tempo de resposta' },
    ],
    description: 'Plataforma BaaS própria que acelera entregas de projetos.',
    color: '#0D9488',
  },
];

const highlights = [
  { icon: Zap, value: '3x', label: 'Mais rápido com ferramentas próprias' },
  { icon: Clock, value: '24h', label: 'Tempo médio de resposta' },
  { icon: CheckCircle, value: '100%', label: 'Projetos entregues no prazo' },
  { icon: TrendingUp, value: '15+', label: 'Projetos concluídos' },
];

export function Results() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resultados" className="py-24 lg:py-32 bg-[#F3F3F0]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
            <span className="w-8 h-[1px] bg-[#0D9488]" />
            Resultados
            <span className="w-8 h-[1px] bg-[#0D9488]" />
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6">
            Números que <span className="text-gradient">comprovam</span>
          </h2>

          <p className="text-lg text-[#6B6B6B] leading-relaxed">
            Não são promessas — são resultados reais de projetos em produção.
          </p>
        </motion.div>

        {/* Highlights Bar */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="bg-white p-6 text-center rounded-lg border border-black/5 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Icon className="w-6 h-6 text-[#0D9488] mx-auto mb-3" />
                <span className="block font-display text-2xl lg:text-3xl font-bold text-[#1A1A1A]">
                  {item.value}
                </span>
                <span className="text-sm text-[#6B6B6B]">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Project Results */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={result.project}
                className="bg-white border border-black/5 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              >
                {/* Header */}
                <div className="p-6 lg:p-8 border-b border-black/5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#0D9488]/10">
                      <Icon className="w-6 h-6 text-[#0D9488]" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#0D9488] block mb-1">
                        {result.type}
                      </span>
                      <h3 className="font-display text-xl font-bold text-[#1A1A1A]">
                        {result.project}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-[#6B6B6B]">{result.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 divide-x divide-black/5">
                  {result.metrics.map((metric) => (
                    <div key={metric.label} className="p-6 text-center">
                      <span className="block font-display text-2xl lg:text-3xl font-bold text-[#0D9488]">
                        {metric.value}
                      </span>
                      <span className="text-xs text-[#6B6B6B]">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-[#6B6B6B] mb-6">
            Quer resultados assim para o seu projeto?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-[#FAFAF8] font-mono text-sm font-medium rounded-lg hover:bg-[#0D9488] transition-all duration-300"
          >
            Vamos conversar
          </a>
        </motion.div>
      </div>
    </section>
  );
}

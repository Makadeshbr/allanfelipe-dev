'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe,
  Smartphone,
  Zap,
  Layout,
  ArrowUpRight,
  Check
} from 'lucide-react';

const services = [
  {
    id: '01',
    icon: Layout,
    title: 'Landing Pages',
    description: 'Páginas de alta conversão que transformam visitantes em clientes. Design focado em resultados.',
    features: ['Design responsivo', 'Otimizado para SEO', 'Carregamento rápido', 'Integração com analytics'],
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    color: '#0D9488',
  },
  {
    id: '02',
    icon: Globe,
    title: 'Sites & Sistemas Web',
    description: 'Desde sites institucionais até sistemas complexos. Arquitetura robusta e escalável.',
    features: ['Painel administrativo', 'API personalizada', 'Banco de dados', 'Autenticação segura'],
    tech: ['Next.js', 'Node.js', 'PostgreSQL'],
    color: '#0D9488',
  },
  {
    id: '03',
    icon: Smartphone,
    title: 'Apps Mobile',
    description: 'Aplicativos nativos para iOS e Android com uma única base de código. Performance real.',
    features: ['iOS & Android', 'Push notifications', 'Offline-first', 'Publicação nas lojas'],
    tech: ['React Native', 'Expo', 'TypeScript'],
    color: '#0D9488',
  },
  {
    id: '04',
    icon: Zap,
    title: 'Automações',
    description: 'Elimine tarefas repetitivas. Integrações entre sistemas, bots e workflows automatizados.',
    features: ['Integração de APIs', 'Bots para WhatsApp', 'Webhooks', 'Relatórios automáticos'],
    tech: ['Node.js', 'Python', 'n8n'],
    color: '#0D9488',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-white border border-black/5 rounded-lg p-8 lg:p-10 hover:border-[#0D9488]/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500"
      whileHover={{ y: -4 }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-0 h-0 border-l-[3px] border-t-[3px] border-transparent group-hover:border-[#0D9488] group-hover:w-8 group-hover:h-8 transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[3px] border-b-[3px] border-transparent group-hover:border-[#0D9488] group-hover:w-8 group-hover:h-8 transition-all duration-300" />

      {/* Number */}
      <span className="font-mono text-xs text-[#A1A1A1] mb-6 block">{service.id}</span>

      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-[#F3F3F0] group-hover:bg-[#0D9488]/10 transition-colors duration-300 mb-6">
        <Icon className="w-6 h-6 text-[#0D9488]" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#0D9488] transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[#6B6B6B] leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-8">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
            <Check className="w-4 h-4 text-[#0D9488]" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-8">
        {service.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-[#F3F3F0] font-mono text-xs text-[#6B6B6B]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="#contato"
        className="inline-flex items-center gap-2 font-mono text-sm text-[#1A1A1A] group-hover:text-[#0D9488] transition-colors"
        whileHover={{ x: 4 }}
      >
        <span>Solicitar orçamento</span>
        <ArrowUpRight className="w-4 h-4" />
      </motion.a>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-[#FAFAF8]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
            <span className="w-8 h-[1px] bg-[#0D9488]" />
            Serviços
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6">
            Soluções completas para seu{' '}
            <span className="text-gradient">negócio digital</span>
          </h2>

          <p className="text-lg text-[#6B6B6B] leading-relaxed">
            Do conceito à entrega final. Cada projeto é desenvolvido com foco em
            performance, escalabilidade e resultados reais para o seu negócio.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-[#6B6B6B] mb-6">
            Não encontrou o que procura? Cada projeto é único.
          </p>
          <motion.a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-[#FAFAF8] font-mono text-sm font-medium hover:bg-[#0D9488] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Vamos conversar sobre seu projeto
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

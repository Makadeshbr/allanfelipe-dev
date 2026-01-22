'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Imagens do RotaFrete para o carrossel
const rotafreteImages = [
  '/rotafrete.png',
  '/rotafrete2.png',
  '/rotafrete3.png',
  '/rotafrete4.png',
  '/rotafrete5.png',
];

// Imagens do Aether para o carrossel
const aetherImages = [
  '/aether.png',
  '/aether2.png',
  '/aether3.png',
];

const projects = [
  {
    id: 1,
    title: 'RotaFrete',
    subtitle: 'Aplicativo Mobile',
    description:
      'Aplicativo completo para gestão de fretes e logística. Conecta motoristas a cargas disponíveis com rastreamento em tempo real.',
    image: '/rotafrete.png',
    images: rotafreteImages,
    isMobile: true,
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Maps API'],
    color: '#0D9488',
    stats: [
      { label: 'Usuários ativos', value: '500+' },
      { label: 'Fretes realizados', value: '2.5k' },
    ],
    links: {
      live: 'https://github.com/Makadeshbr/rotafrete-downloads/releases/tag/v2.0',
      github: null,
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Aether Platform',
    subtitle: 'Backend-as-a-Service',
    description:
      'Plataforma BaaS própria que acelera o desenvolvimento de aplicações. Autenticação, banco de dados, storage e mais — em uma única solução.',
    image: '/aether.png',
    images: aetherImages,
    isMobile: false,
    tags: ['Hono', 'Drizzle ORM', 'PostgreSQL', 'TypeScript SDK'],
    color: '#0D9488',
    stats: [
      { label: 'APIs ativas', value: '12+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    links: {
      live: 'https://aether-admin-coral.vercel.app/',
      github: 'https://github.com/Makadeshbr',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Pedágio Premium',
    subtitle: 'PWA com IA',
    description:
      'Aplicativo PWA para análise inteligente de pedágios com IA. Calcula rotas otimizadas e custos de viagem com precisão.',
    image: '/saas-landing.png',
    tags: ['PWA', 'Firebase', 'IA', 'Maps API'],
    color: '#0D9488',
    stats: [
      { label: 'Análises por IA', value: '100%' },
      { label: 'Performance', value: '95/100' },
    ],
    links: {
      live: 'https://pwa-pedagio-premium.web.app/',
      github: null,
    },
    featured: false,
  },
  {
    id: 4,
    title: 'Sistema de Automação',
    subtitle: 'Integração & Bots',
    description:
      'Sistema de automação para integrar múltiplas plataformas. Webhooks, processamento de dados e notificações automáticas.',
    image: '/saas-landing2.png',
    tags: ['Node.js', 'n8n', 'APIs REST', 'Webhooks'],
    color: '#0D9488',
    stats: [
      { label: 'Horas economizadas', value: '120/mês' },
      { label: 'Integrações', value: '8+' },
    ],
    links: {
      live: null,
      github: null,
    },
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navegação do carrossel
  const nextImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  // Imagem atual para projetos mobile
  const currentImage = project.images ? project.images[currentImageIndex] : project.image;

  return (
    <motion.article
      className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-[#F3F3F0] rounded-lg overflow-hidden border border-black/5 hover:border-[#0D9488]/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500">
        {/* Project Image Area */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden flex items-center justify-center">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}30 100%)`,
            }}
          />

          {project.isMobile ? (
            /* Mobile Mockup with Carousel */
            <div className="relative z-10 py-4 px-8 sm:px-16">
              {/* Phone Frame - Responsive size */}
              <div className="relative mx-auto w-36 sm:w-48 md:w-64 bg-[#1A1A1A] rounded-[2rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-5 sm:h-7 bg-[#1A1A1A] rounded-full z-20" />

                {/* Screen */}
                <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden relative">
                  {/* Status bar area */}
                  <div className="h-6 sm:h-10 bg-[#1A1A1A]" />

                  {/* App Screen - Image goes here */}
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <Image
                      src={currentImage}
                      alt={`${project.title} - Tela ${currentImageIndex + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 256px"
                    />
                  </div>

                  {/* Home indicator */}
                  <div className="h-5 sm:h-8 bg-white flex items-center justify-center">
                    <div className="w-16 sm:w-28 h-1 sm:h-1.5 bg-[#1A1A1A] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Carousel Navigation - OUTSIDE THE PHONE, ALWAYS VISIBLE */}
              {project.images && project.images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(); }}
                    className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white rounded-full shadow-xl hover:bg-[#0D9488] hover:text-white transition-all duration-300 cursor-pointer"
                    type="button"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(); }}
                    className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white rounded-full shadow-xl hover:bg-[#0D9488] hover:text-white transition-all duration-300 cursor-pointer"
                    type="button"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>

                  {/* Dots indicator */}
                  <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                        type="button"
                        className={`h-2 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${idx === currentImageIndex
                          ? 'bg-[#0D9488] w-5 sm:w-8'
                          : 'bg-[#1A1A1A]/30 w-2 sm:w-3 hover:bg-[#1A1A1A]/50'
                          }`}
                        aria-label={`Ir para imagem ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Web Project - Browser Mockup - FULL WIDTH with Carousel */
            <div className="absolute inset-4 z-10 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full h-full max-h-[90%]">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-5 py-2.5 bg-[#F3F3F0] border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="h-5 bg-[#E5E5E5] rounded-full max-w-md" />
                  </div>
                </div>
                {/* Browser content - fills remaining space */}
                <div className="relative w-full h-[calc(100%-40px)] overflow-hidden">
                  <Image
                    src={currentImage}
                    alt={`${project.title} - Tela ${currentImageIndex + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                </div>
              </div>

              {/* Carousel Navigation for web projects */}
              {project.images && project.images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-xl hover:bg-[#0D9488] hover:text-white transition-all duration-300 cursor-pointer"
                    type="button"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full shadow-xl hover:bg-[#0D9488] hover:text-white transition-all duration-300 cursor-pointer"
                    type="button"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                        type="button"
                        className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${idx === currentImageIndex
                          ? 'bg-[#0D9488] w-8'
                          : 'bg-white/80 w-3 hover:bg-white'
                          }`}
                        aria-label={`Ir para imagem ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Overlay on hover - ONLY for projects WITHOUT carousel */}
          {!project.images && (
            <motion.div
              className="absolute inset-0 bg-[#1A1A1A]/80 flex items-center justify-center gap-4 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white text-[#1A1A1A] rounded-lg hover:bg-[#0D9488] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white text-[#1A1A1A] rounded-lg hover:bg-[#0D9488] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
            </motion.div>
          )}
        </div>

        {/* Project Info */}
        <div className="p-4 sm:p-6 lg:p-8 bg-white">
          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <span className="font-mono text-[10px] sm:text-xs text-[#0D9488] mb-1 block">
                {project.subtitle}
              </span>
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-[#1A1A1A]">
                {project.title}
              </h3>
            </div>
            {project.featured && (
              <span className="px-2 sm:px-3 py-1 bg-[#0D9488]/10 font-mono text-[10px] sm:text-xs text-[#0D9488] whitespace-nowrap">
                Destaque
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-4 sm:mb-6">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex gap-4 sm:gap-8 mb-4 sm:mb-6">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[#A1A1A1]">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 bg-[#F3F3F0] font-mono text-[10px] sm:text-xs text-[#6B6B6B]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projetos" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
              <span className="w-8 h-[1px] bg-[#0D9488]" />
              Projetos
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6">
              Trabalhos que{' '}
              <span className="text-gradient">geram resultados</span>
            </h2>

            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              Cada projeto é uma parceria. Conheça algumas das soluções que
              desenvolvi para transformar ideias em produtos digitais de sucesso.
            </p>
          </div>

          <motion.a
            href="#contato"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#1A1A1A] hover:text-[#0D9488] transition-colors"
            whileHover={{ x: 4 }}
          >
            <span>Ver todos os projetos</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

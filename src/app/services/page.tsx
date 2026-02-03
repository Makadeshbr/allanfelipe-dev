/**
 * ============================================
 * SERVICES PAGE - /services
 * ============================================
 * 
 * Página de serviços detalhada
 * Baseada no 1minus1.com/services
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, Server, Layers, ArrowRight, Zap, Shield, Gauge } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        id: 'web',
        icon: <Globe size={32} />,
        title: 'Desenvolvimento Web',
        subtitle: 'Aplicações web modernas e de alta performance',
        description: 'Crio websites e aplicações web que não apenas impressionam visualmente, mas também entregam resultados mensuráveis. Do design à implementação, cada projeto é construído com foco em performance e experiência do usuário.',
        features: [
            'Landing Pages de Alta Conversão',
            'Web Apps (SPA/SSR/SSG)',
            'E-commerce Completo',
            'Dashboards & Admin Panels',
            'Portais Corporativos',
            'Progressive Web Apps (PWA)',
        ],
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        id: 'mobile',
        icon: <Smartphone size={32} />,
        title: 'Apps Mobile',
        subtitle: 'Aplicativos nativos e cross-platform',
        description: 'Desenvolvo aplicativos mobile que oferecem experiências nativas excepcionais. Usando React Native, entrego apps para iOS e Android com uma única base de código, mantendo alta qualidade.',
        features: [
            'Apps iOS & Android',
            'React Native Cross-Platform',
            'Integração com APIs',
            'Push Notifications',
            'Geolocalização',
            'Publicação nas Stores',
        ],
        technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    },
    {
        id: 'backend',
        icon: <Server size={32} />,
        title: 'Backend & APIs',
        subtitle: 'Infraestrutura robusta e escalável',
        description: 'Construo backends sólidos que suportam o crescimento do seu negócio. APIs RESTful e GraphQL bem documentadas, com foco em segurança, escalabilidade e manutenibilidade.',
        features: [
            'APIs REST & GraphQL',
            'Microservices Architecture',
            'Database Design',
            'Authentication & Security',
            'Real-time (WebSocket)',
            'Cloud Integration',
        ],
        technologies: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB'],
    },
    {
        id: 'fullstack',
        icon: <Layers size={32} />,
        title: 'Full-Stack Solutions',
        subtitle: 'Soluções completas end-to-end',
        description: 'Ofereço desenvolvimento completo, do frontend ao backend, deploy e manutenção. Uma única pessoa de referência para todo o projeto, garantindo consistência e qualidade.',
        features: [
            'Arquitetura de Software',
            'DevOps & CI/CD',
            'Cloud Deploy (Vercel, AWS)',
            'Monitoramento & Analytics',
            'Manutenção Contínua',
            'Documentação Técnica',
        ],
        technologies: ['Next.js', 'Node.js', 'Docker', 'GitHub Actions'],
    },
];

const benefits = [
    {
        icon: <Zap size={24} />,
        title: 'Entrega Rápida',
        description: 'Metodologia ágil com entregas incrementais.',
    },
    {
        icon: <Shield size={24} />,
        title: 'Código Seguro',
        description: 'Melhores práticas de segurança em cada linha.',
    },
    {
        icon: <Gauge size={24} />,
        title: 'Alta Performance',
        description: 'Otimização desde o primeiro commit.',
    },
];

export default function ServicesPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                const lines = heroRef.current.querySelectorAll('.reveal-line');
                lines.forEach((line, i) => {
                    gsap.fromTo(
                        line,
                        { y: '100%' },
                        { y: '0%', duration: 1.2, ease: 'power4.out', delay: 0.2 + i * 0.1 }
                    );
                });
            }

            if (servicesRef.current) {
                const cards = servicesRef.current.querySelectorAll('.service-card');
                cards.forEach((card, i) => {
                    gsap.fromTo(
                        card,
                        { y: 100, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'power4.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%',
                            },
                        }
                    );
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Hero */}
            <section ref={heroRef} className="min-h-[60vh] flex items-center pt-32 pb-16 bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="overflow-hidden mb-4">
                        <p className="reveal-line text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            Serviços
                        </p>
                    </div>

                    <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] mb-8">
                        <div className="overflow-hidden">
                            <span className="reveal-line block">Web, Mobile, Backend &</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="reveal-line block text-gradient">Soluções Full-Stack</span>
                        </div>
                    </h1>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-[var(--text-secondary)] text-xl max-w-2xl leading-relaxed"
                    >
                        Caminho direto: ideias para inovação, design para build,
                        engajamento para crescimento. Isso é o que eu entrego.
                    </motion.p>
                </div>
            </section>

            {/* Benefits Bar */}
            <section className="py-12 bg-[var(--bg-secondary)] border-y border-white/5">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)]">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{benefit.title}</h3>
                                    <p className="text-[var(--text-muted)] text-sm">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section ref={servicesRef} className="section bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="space-y-24">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.id}
                                className="service-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Content */}
                                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] mb-6">
                                        {service.icon}
                                    </div>

                                    <h2 className="font-display text-3xl font-bold mb-2">
                                        {service.title}
                                    </h2>
                                    <p className="text-[var(--accent-primary)] mb-4">
                                        {service.subtitle}
                                    </p>
                                    <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                                        {service.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {service.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs bg-[var(--bg-card)] rounded-full text-[var(--text-secondary)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href="/#contact"
                                        className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:gap-4 transition-all"
                                    >
                                        Solicitar Orçamento
                                        <ArrowRight size={18} />
                                    </a>
                                </div>

                                {/* Features */}
                                <div className={`bg-[var(--bg-card)] rounded-2xl p-8 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <h3 className="font-display text-lg font-semibold mb-6">
                                        O que inclui:
                                    </h3>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-3 text-[var(--text-secondary)]">
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container text-center">
                    <h2 className="font-display text-h1 font-bold mb-4">
                        Pronto para <span className="text-gradient">Começar?</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                        Conte sobre seu projeto e receba uma proposta personalizada.
                    </p>
                    <motion.a
                        href="/#contact"
                        className="btn btn-primary inline-flex"
                        whileHover={{ scale: 1.05 }}
                    >
                        Iniciar Projeto
                    </motion.a>
                </div>
            </section>
        </>
    );
}

/**
 * ============================================
 * ABOUT PAGE - /about
 * ============================================
 * 
 * Página sobre Allan Felipe
 * Estrutura baseada no 1minus1.com/about
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Palette, Rocket, Users, Award } from 'lucide-react';
import { techStack } from '@/data/site-data';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
    {
        icon: <Code2 size={28} />,
        title: 'Código Limpo',
        description: 'TypeScript, padrões SOLID, testes automatizados e documentação completa.',
    },
    {
        icon: <Palette size={28} />,
        title: 'Design & UX',
        description: 'Interfaces modernas, micro-interações e experiências memoráveis.',
    },
    {
        icon: <Cpu size={28} />,
        title: 'Performance',
        description: 'Core Web Vitals otimizados, SSR/SSG e cache inteligente.',
    },
    {
        icon: <Rocket size={28} />,
        title: 'Deploy & DevOps',
        description: 'CI/CD automatizado, containers Docker e cloud infrastructure.',
    },
    {
        icon: <Users size={28} />,
        title: 'Colaboração',
        description: 'Git flow, code reviews e comunicação clara com stakeholders.',
    },
    {
        icon: <Award size={28} />,
        title: 'Qualidade',
        description: 'Entrega de código production-ready com atenção aos detalhes.',
    },
];

const clients = [
    'Startups',
    'Agências',
    'E-commerce',
    'SaaS',
    'Apps Mobile',
    'Portais',
];

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const clientsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text reveals
            if (heroRef.current) {
                const lines = heroRef.current.querySelectorAll('.reveal-line');
                lines.forEach((line, i) => {
                    gsap.fromTo(
                        line,
                        { y: '100%' },
                        {
                            y: '0%',
                            duration: 1.2,
                            ease: 'power4.out',
                            delay: 0.2 + i * 0.1,
                        }
                    );
                });
            }

            // Capabilities stagger
            if (capabilitiesRef.current) {
                const cards = capabilitiesRef.current.querySelectorAll('.capability-card');
                gsap.fromTo(
                    cards,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: capabilitiesRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Clients reveal
            if (clientsRef.current) {
                const items = clientsRef.current.querySelectorAll('.client-item');
                gsap.fromTo(
                    items,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: clientsRef.current,
                            start: 'top 85%',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section ref={heroRef} className="min-h-[70vh] flex items-center pt-32 pb-20 bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="overflow-hidden mb-4">
                        <p className="reveal-line text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            Sobre Mim
                        </p>
                    </div>

                    <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] mb-8">
                        <div className="overflow-hidden">
                            <span className="reveal-line block">Não apenas faça.</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="reveal-line block text-gradient">Alcance.</span>
                        </div>
                    </h1>

                    <div className="overflow-hidden max-w-2xl">
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-[var(--text-secondary)] text-xl leading-relaxed"
                        >
                            Desenvolvedor Full-Stack com mais de 2 anos criando experiências digitais
                            inovadoras. De conceitos criativos a aplicações escaláveis, ideias são meu DNA.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Tagline */}
            <section className="py-20 bg-[var(--bg-secondary)]">
                <div className="container">
                    <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold text-center max-w-4xl mx-auto leading-tight">
                        <span className="text-[var(--text-secondary)]">
                            De redesigns de UX a branding completo,
                        </span>
                        <span className="text-gradient"> web apps inovadores </span>
                        <span className="text-[var(--text-secondary)]">
                            e aplicações mobile - eu entrego resultados.
                        </span>
                    </h2>
                </div>
            </section>

            {/* Capabilities Grid */}
            <section className="section bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-h1 font-bold mb-4">
                            Minhas <span className="text-gradient">Especialidades</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                            Competências técnicas e soft skills que trago para cada projeto.
                        </p>
                    </div>

                    <div ref={capabilitiesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                className="capability-card p-8 bg-[var(--bg-card)] rounded-2xl border border-white/5 group"
                                whileHover={{ y: -8, borderColor: 'rgba(0, 255, 136, 0.3)' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] mb-5 group-hover:scale-110 transition-transform">
                                    {cap.icon}
                                </div>
                                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {cap.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm">
                                    {cap.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container">
                    <h2 className="font-display text-h2 font-bold text-center mb-12">
                        Tech Stack
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03, ease: [0.34, 1.56, 0.64, 1] }}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 136, 0.2)' }}
                                className="px-5 py-2.5 bg-[var(--bg-card)] rounded-full text-[var(--text-secondary)] text-sm cursor-default transition-colors"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clients/Experience */}
            <section className="section bg-[var(--bg-primary)]">
                <div className="container">
                    <h2 className="font-display text-h1 font-bold text-center mb-6">
                        Experiência com <span className="text-gradient">Diversos Nichos</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-12">
                        Já trabalhei com clientes de diferentes segmentos, desde startups até empresas estabelecidas.
                    </p>

                    <div ref={clientsRef} className="flex flex-wrap justify-center gap-4">
                        {clients.map((client) => (
                            <span
                                key={client}
                                className="client-item px-6 py-3 bg-[var(--bg-card)] rounded-xl text-[var(--text-primary)] font-medium"
                            >
                                {client}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container text-center">
                    <h2 className="font-display text-h1 font-bold mb-6">
                        Vamos <span className="text-gradient">Trabalhar Juntos?</span>
                    </h2>
                    <motion.a
                        href="/#contact"
                        className="btn btn-primary inline-flex"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Iniciar Conversa
                    </motion.a>
                </div>
            </section>
        </>
    );
}

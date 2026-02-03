/**
 * ============================================
 * CASE STUDY PAGE - Dynamic Route
 * /case-studies/[slug]/page.tsx
 * ============================================
 * 
 * Página individual de case study
 */

'use client';

import { use } from 'react';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink, Github, Clock, Users, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Dados dos case studies
const caseStudiesData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    technologies: string[];
    duration: string;
    role: string;
    color: string;
    liveUrl?: string;
    githubUrl?: string;
}> = {
    'app-gerenciamento': {
        title: 'App de Gerenciamento',
        subtitle: 'Aplicativo mobile completo para gestão empresarial',
        description: 'Sistema completo de gerenciamento empresarial com React Native e Node.js. Interface moderna, performática e intuitiva para gestão de equipes, projetos e tarefas.',
        challenge: 'O cliente precisava de uma solução mobile que permitisse gerenciar toda a operação da empresa de forma centralizada, com acesso offline e sincronização em tempo real.',
        solution: 'Desenvolvi um app React Native com arquitetura offline-first, usando AsyncStorage para persistência local e WebSocket para sincronização em tempo real. Backend em Node.js com Express e MongoDB.',
        results: [
            '50% de redução no tempo de gestão',
            'Adoção por 100% dos funcionários',
            '99.9% de uptime do sistema',
            'Performance de 60fps em animações',
        ],
        technologies: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux'],
        duration: '8 semanas',
        role: 'Full-Stack Developer',
        color: 'from-emerald-500/40 to-teal-500/30',
        liveUrl: '#',
        githubUrl: '#',
    },
    'ecommerce-platform': {
        title: 'E-commerce Platform',
        subtitle: 'Plataforma de e-commerce completa com pagamentos',
        description: 'Loja virtual moderna com Next.js, integração de pagamentos Stripe, painel administrativo e sistema de gestão de produtos.',
        challenge: 'Criar uma plataforma de vendas escalável que suportasse alto volume de transações com checkout rápido e seguro.',
        solution: 'Arquitetura JAMstack com Next.js SSG para páginas de produto, API Routes para checkout, Stripe para pagamentos e Prisma ORM com PostgreSQL.',
        results: [
            '3x aumento em conversões',
            'Checkout em menos de 2 minutos',
            '100 Lighthouse Score',
            'Zero downtime em 6 meses',
        ],
        technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
        duration: '6 semanas',
        role: 'Full-Stack Developer',
        color: 'from-violet-500/40 to-purple-500/30',
        liveUrl: '#',
        githubUrl: '#',
    },
    'dashboard-analytics': {
        title: 'Dashboard Analytics',
        subtitle: 'Painel de dados em tempo real com visualizações',
        description: 'Dashboard interativo com gráficos dinâmicos, filtros avançados, exportação de relatórios e atualização em tempo real.',
        challenge: 'Visualizar grandes volumes de dados de forma clara e permitir análises complexas sem comprometer a performance.',
        solution: 'React com D3.js para visualizações customizadas, WebSocket para dados em tempo real, e lazy loading para otimização de performance.',
        results: [
            'Processamento de 1M+ registros',
            'Atualização em tempo real (<100ms)',
            'Redução de 70% no tempo de análise',
            'Exportação para PDF/Excel',
        ],
        technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js', 'Redis', 'PostgreSQL'],
        duration: '5 semanas',
        role: 'Frontend Developer',
        color: 'from-amber-500/40 to-orange-500/30',
        liveUrl: '#',
        githubUrl: '#',
    },
    'landing-premium': {
        title: 'Landing Page Premium',
        subtitle: 'Site institucional com animações premium',
        description: 'Landing page de alta conversão com design premium, animações suaves e otimização para SEO.',
        challenge: 'Criar uma presença digital impactante que comunicasse profissionalismo e convertesse visitantes em leads.',
        solution: 'Next.js com SSG para SEO, Framer Motion para animações suaves, e formulários integrados com CRM.',
        results: [
            '85% aumento em leads',
            '100 Lighthouse Score',
            '< 1s Time to Interactive',
            'Top 3 Google para keywords alvo',
        ],
        technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'Google Analytics'],
        duration: '3 semanas',
        role: 'Frontend Developer',
        color: 'from-blue-500/40 to-cyan-500/30',
        liveUrl: '#',
        githubUrl: '#',
    },
};

// Fallback para slugs não mapeados
const defaultCase = {
    title: 'Case Study',
    subtitle: 'Projeto em destaque',
    description: 'Descrição do projeto.',
    challenge: 'Desafio do projeto.',
    solution: 'Solução implementada.',
    results: ['Resultado 1', 'Resultado 2'],
    technologies: ['Tech 1', 'Tech 2'],
    duration: '4 semanas',
    role: 'Developer',
    color: 'from-gray-500/40 to-gray-400/30',
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const caseData = caseStudiesData[slug] || defaultCase;

    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            if (heroRef.current) {
                gsap.fromTo(
                    heroRef.current.querySelectorAll('.reveal-item'),
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
                );
            }

            // Content sections
            if (contentRef.current) {
                const sections = contentRef.current.querySelectorAll('.content-section');
                sections.forEach((section) => {
                    gsap.fromTo(
                        section,
                        { y: 60, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power4.out',
                            scrollTrigger: {
                                trigger: section,
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
            <section ref={heroRef} className="min-h-[70vh] flex items-end pt-32 pb-20 bg-[var(--bg-primary)] relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${caseData.color} opacity-30`} />

                <div className="container relative z-10">
                    {/* Back button */}
                    <Link
                        href="/case-studies"
                        className="reveal-item inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors mb-8"
                    >
                        <ArrowLeft size={18} />
                        Voltar aos cases
                    </Link>

                    {/* Title */}
                    <h1 className="reveal-item font-display text-[clamp(2rem,5vw,4rem)] font-bold mb-4">
                        {caseData.title}
                    </h1>

                    <p className="reveal-item text-[var(--text-secondary)] text-xl max-w-2xl mb-8">
                        {caseData.subtitle}
                    </p>

                    {/* Meta */}
                    <div className="reveal-item flex flex-wrap gap-6 mb-8">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                            <Clock size={18} className="text-[var(--accent-primary)]" />
                            {caseData.duration}
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                            <Users size={18} className="text-[var(--accent-primary)]" />
                            {caseData.role}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="reveal-item flex gap-4">
                        {caseData.liveUrl && (
                            <motion.a
                                href={caseData.liveUrl}
                                target="_blank"
                                className="btn btn-primary inline-flex items-center gap-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                <ExternalLink size={18} />
                                Ver Projeto
                            </motion.a>
                        )}
                        {caseData.githubUrl && (
                            <motion.a
                                href={caseData.githubUrl}
                                target="_blank"
                                className="btn btn-secondary inline-flex items-center gap-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                <Github size={18} />
                                Ver Código
                            </motion.a>
                        )}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section ref={contentRef} className="section bg-[var(--bg-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Overview */}
                            <div className="content-section">
                                <h2 className="font-display text-2xl font-bold mb-4">Visão Geral</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {caseData.description}
                                </p>
                            </div>

                            {/* Challenge */}
                            <div className="content-section">
                                <h2 className="font-display text-2xl font-bold mb-4">O Desafio</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {caseData.challenge}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="content-section">
                                <h2 className="font-display text-2xl font-bold mb-4">A Solução</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {caseData.solution}
                                </p>
                            </div>

                            {/* Results */}
                            <div className="content-section">
                                <h2 className="font-display text-2xl font-bold mb-6">Resultados</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {caseData.results.map((result, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-start gap-3 p-4 bg-[var(--bg-card)] rounded-xl"
                                            whileHover={{ x: 4 }}
                                        >
                                            <CheckCircle2 className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5" size={20} />
                                            <span className="text-[var(--text-secondary)]">{result}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="content-section sticky top-32">
                                <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-white/5">
                                    <h3 className="font-display text-lg font-semibold mb-4">Tecnologias</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseData.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-sm bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-lg"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <hr className="my-6 border-white/10" />

                                    <h3 className="font-display text-lg font-semibold mb-4">Detalhes</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-[var(--text-muted)]">Duração</span>
                                            <span className="text-[var(--text-primary)]">{caseData.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[var(--text-muted)]">Papel</span>
                                            <span className="text-[var(--text-primary)]">{caseData.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[var(--bg-primary)]">
                <div className="container text-center">
                    <h2 className="font-display text-h1 font-bold mb-4">
                        Gostou do que viu?
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8">
                        Vamos criar algo incrível juntos.
                    </p>
                    <motion.a
                        href="/#contact"
                        className="btn btn-primary inline-flex"
                        whileHover={{ scale: 1.05 }}
                    >
                        Iniciar Conversa
                    </motion.a>
                </div>
            </section>
        </>
    );
}

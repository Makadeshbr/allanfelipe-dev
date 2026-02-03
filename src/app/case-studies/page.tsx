/**
 * ============================================
 * CASE STUDIES PAGE - /case-studies
 * ============================================
 * 
 * Lista de case studies com featured card
 * Baseado no 1minus1.com/case-studies
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Users, Zap } from 'lucide-react';
import { projects } from '@/data/site-data';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Dados expandidos para case studies
const caseStudies = projects.filter((p) => p.featured).map((project) => ({
    ...project,
    duration: '4-8 semanas',
    impact: '3x mais rápido',
    client: 'Cliente Confidencial',
}));

export default function CaseStudiesPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

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

            if (listRef.current) {
                const items = listRef.current.querySelectorAll('.case-item');
                items.forEach((item) => {
                    gsap.fromTo(
                        item,
                        { y: 80, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power4.out',
                            scrollTrigger: {
                                trigger: item,
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
            <section ref={heroRef} className="min-h-[50vh] flex items-center pt-32 pb-12 bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="overflow-hidden mb-4">
                        <p className="reveal-line text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            Case Studies
                        </p>
                    </div>

                    <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] mb-8">
                        <div className="overflow-hidden">
                            <span className="reveal-line block">Histórias de</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="reveal-line block text-gradient">Sucesso</span>
                        </div>
                    </h1>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-[var(--text-secondary)] text-xl max-w-2xl"
                    >
                        Análises aprofundadas dos projetos mais impactantes. Desafios, soluções e resultados.
                    </motion.p>
                </div>
            </section>

            {/* Featured Case Study */}
            {caseStudies[0] && (
                <section className="py-16 bg-[var(--bg-secondary)]">
                    <div className="container">
                        <motion.article
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--accent-primary)]/30 via-[var(--accent-tertiary)]/20 to-[var(--bg-card)]">
                                <div
                                    className="absolute inset-0 opacity-[0.1]"
                                    style={{
                                        backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                    `,
                                        backgroundSize: '50px 50px',
                                    }}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 bg-[var(--accent-primary)] rounded-lg text-xs font-bold text-[var(--bg-primary)]">
                                        DESTAQUE
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {caseStudies[0].tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="font-display text-3xl font-bold mb-4">
                                    {caseStudies[0].title}
                                </h2>

                                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                    {caseStudies[0].description}
                                </p>

                                {/* Metrics */}
                                <div className="flex gap-6 mb-8">
                                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                        <Clock size={16} className="text-[var(--accent-primary)]" />
                                        {caseStudies[0].duration}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                        <Zap size={16} className="text-[var(--accent-primary)]" />
                                        {caseStudies[0].impact}
                                    </div>
                                </div>

                                <motion.a
                                    href={`/case-studies/${caseStudies[0].id}`}
                                    className="btn btn-primary inline-flex"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    Ver Case Completo
                                    <ArrowRight size={18} className="ml-2" />
                                </motion.a>
                            </div>
                        </motion.article>
                    </div>
                </section>
            )}

            {/* Case Studies List */}
            <section className="section bg-[var(--bg-primary)]">
                <div className="container">
                    <h2 className="font-display text-h2 font-bold mb-12">
                        Todos os <span className="text-gradient">Cases</span>
                    </h2>

                    <div ref={listRef} className="space-y-8">
                        {caseStudies.map((study, i) => (
                            <motion.article
                                key={study.id}
                                className="case-item group"
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <a
                                    href={`/case-studies/${study.id}`}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 bg-[var(--bg-card)] rounded-2xl border border-white/5 hover:border-[var(--accent-primary)]/30 transition-colors"
                                >
                                    {/* Number */}
                                    <div className="lg:col-span-1 flex items-center">
                                        <span className="text-5xl font-bold text-[var(--accent-primary)]/20">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:col-span-8">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {study.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-xs bg-[var(--bg-secondary)] rounded text-[var(--text-muted)]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {study.title}
                                        </h3>

                                        <p className="text-[var(--text-secondary)]">
                                            {study.description}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <div className="lg:col-span-3 flex items-center justify-end">
                                        <span className="flex items-center gap-2 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Ver Case
                                            <ArrowRight size={18} />
                                        </span>
                                    </div>
                                </a>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container text-center">
                    <h2 className="font-display text-h1 font-bold mb-4">
                        Pronto para o <span className="text-gradient">Próximo Case?</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                        Seu projeto pode ser o próximo a fazer parte desta lista.
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

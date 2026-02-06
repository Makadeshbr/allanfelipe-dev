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
import Image from 'next/image';
import { projects } from '@/data/site-data';
import { FloatingShapes } from '@/components/ui/FloatingShapes';
import { AnimatedHeadline, RevealText } from '@/components/ui/SplitText';

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
                        { y: '100%', rotation: -3 },
                        { y: '0%', rotation: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 + i * 0.1 }
                    );
                });
            }

            if (listRef.current) {
                const items = listRef.current.querySelectorAll('.case-item');
                items.forEach((item) => {
                    gsap.fromTo(
                        item,
                        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
                        {
                            clipPath: 'inset(0% 0 0 0)',
                            opacity: 1,
                            duration: 1,
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
            {/* Hero with Floating Shapes */}
            <section ref={heroRef} className="min-h-[50vh] flex items-center pt-32 pb-12 bg-[var(--bg-primary)] relative overflow-hidden">
                {/* Floating Dev Shapes */}
                <FloatingShapes />
                <div className="container relative z-10">
                    {/* Tagline */}
                    <RevealText className="mb-4" delay={0.2}>
                        <p className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            Case Studies
                        </p>
                    </RevealText>

                    {/* Headline com animação split */}
                    <AnimatedHeadline
                        lines={['Histórias de', 'Sucesso']}
                        className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] mb-8"
                        highlightLast={true}
                        delay={0.3}
                        effect="warp"
                    />

                    {/* Description */}
                    <RevealText className="text-[var(--text-secondary)] text-xl max-w-2xl" delay={0.7}>
                        Análises aprofundadas dos projetos mais impactantes. Desafios, soluções e resultados.
                    </RevealText>
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

            {/* Case Studies - Fullwidth Cards */}
            <section className="bg-[var(--bg-primary)]">
                <div ref={listRef} className="space-y-0">
                    {caseStudies.map((study, i) => (
                        <motion.article
                            key={study.id}
                            className="case-item group"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                        >
                            <a
                                href={`/case-studies/${study.id}`}
                                className="block relative overflow-hidden"
                            >
                                {/* Fullwidth Container */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[70vh] bg-[var(--bg-card)] border-b border-white/5">
                                    {/* Image Side (60%) */}
                                    <div className={`lg:col-span-7 relative overflow-hidden aspect-[16/10] lg:aspect-auto ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        {study.image ? (
                                            <Image
                                                src={study.image}
                                                alt={study.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                            />
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient}`}>
                                                <div
                                                    className="absolute inset-0 opacity-[0.08]"
                                                    style={{
                                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                                        backgroundSize: '50px 50px',
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {/* Blend-difference layer */}
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blend-difference transition-opacity duration-700 z-[1]" />

                                        {/* Overlay gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 1 ? 'l' : 'r'} from-[var(--bg-card)] via-[var(--bg-card)]/50 to-transparent`} />

                                        {/* Number overlay */}
                                        <div className="absolute bottom-8 left-8">
                                            <span className="text-[8rem] font-bold text-white leading-none faded">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Side (40%) */}
                                    <div className={`lg:col-span-5 flex flex-col justify-center p-6 md:p-10 lg:p-14 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        {/* Client/Category Tag */}
                                        <div className="mb-6">
                                            <span className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.3em] font-medium">
                                                {study.category}
                                            </span>
                                        </div>

                                        {/* Title - Grande e impactante */}
                                        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] mb-6 group-hover:text-[var(--accent-primary)] transition-colors duration-500">
                                            {study.title}
                                        </h2>

                                        {/* Subtitle */}
                                        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                                            {study.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {study.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1.5 text-xs bg-white/5 text-[var(--text-muted)] rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA with animated arrow */}
                                        <div className="flex items-center gap-3 text-[var(--text-primary)] group/cta">
                                            <span className="text-sm font-medium uppercase tracking-wider">
                                                Read Article
                                            </span>
                                            <motion.span
                                                className="inline-block"
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 8 }}
                                            >
                                                <ArrowRight size={18} className="group-hover:text-[var(--accent-primary)] transition-colors" />
                                            </motion.span>
                                            {/* Underline animado */}
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--accent-primary)] group-hover:w-24 transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </motion.article>
                    ))}
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


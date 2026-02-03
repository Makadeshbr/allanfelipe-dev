/**
 * ============================================
 * COMPONENT: Featured Cases - Enhanced
 * ============================================
 * 
 * Grid com Featured Project destacado
 * Estilo exato do 1minus1.com
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// IDs dos cases para tradução e metadados visuais que não mudam
const casesData = [
    {
        id: 'app-gerenciamento',
        translationKey: 'appManagement',
        tags: ['React Native', 'Node.js'],
        gradient: 'from-blue-600/40 to-indigo-600/30',
        featured: true,
    },
    {
        id: 'ecommerce-platform',
        translationKey: 'ecommerce',
        tags: ['Next.js', 'Stripe'],
        gradient: 'from-violet-600/40 to-purple-600/30',
    },
    {
        id: 'dashboard-analytics',
        translationKey: 'dashboard',
        tags: ['React', 'D3.js'],
        gradient: 'from-cyan-600/40 to-blue-600/30',
    },
    {
        id: 'landing-premium',
        translationKey: 'landing',
        tags: ['Next.js', 'Framer Motion'],
        gradient: 'from-slate-600/40 to-gray-600/30',
    },
];

export function FeaturedCases() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveals
            if (headerRef.current) {
                const lines = headerRef.current.querySelectorAll('.reveal-line');
                lines.forEach((line, i) => {
                    gsap.fromTo(
                        line,
                        { y: '100%' },
                        {
                            y: '0%',
                            duration: 1.2,
                            ease: 'power4.out',
                            scrollTrigger: {
                                trigger: headerRef.current,
                                start: 'top 85%',
                            },
                            delay: i * 0.1,
                        }
                    );
                });
            }

            // Cards reveal with clip-path
            const cards = sectionRef.current?.querySelectorAll('.case-card');
            cards?.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        clipPath: 'inset(100% 0 0 0)',
                        opacity: 0
                    },
                    {
                        clipPath: 'inset(0% 0 0 0)',
                        opacity: 1,
                        duration: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                        },
                        delay: i * 0.15,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Preparar cases traduzidos
    const featuredCases = casesData.map(c => ({
        ...c,
        title: t(`cases.items.${c.translationKey}.title`) as string,
        subtitle: t(`cases.items.${c.translationKey}.description`) as string,
    }));

    return (
        <section ref={sectionRef} className="section bg-[var(--bg-primary)]">
            <div className="container">
                {/* Header */}
                <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
                    <div>
                        <div className="overflow-hidden mb-4">
                            <p className="reveal-line text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                                {t('cases.subtitle') as string}
                            </p>
                        </div>
                        <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold">
                            <div className="overflow-hidden">
                                <span className="reveal-line block">{t('cases.title.line1') as string}</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="reveal-line block text-gradient">{t('cases.title.line2') as string}</span>
                            </div>
                        </h2>
                    </div>

                    <Link
                        href="/case-studies"
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"
                    >
                        {t('cases.viewAll') as string}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Featured Project - Destacado */}
                <motion.article
                    className="case-card group mb-12"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link href={`/case-studies/${featuredCases[0].id}`}>
                        <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Image with Zoom Effect */}
                                <div className="case-image-wrapper relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                                    <div className={`case-image-bg absolute inset-0 bg-gradient-to-br ${featuredCases[0].gradient}`}>
                                        {/* Grid pattern */}
                                        <div
                                            className="absolute inset-0 opacity-[0.08]"
                                            style={{
                                                backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                                                backgroundSize: '50px 50px',
                                            }}
                                        />

                                        {/* Featured badge */}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-[var(--accent-primary)] rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                                                {t('cases.featuredBadge') as string || 'Highlight'}
                                            </span>
                                        </div>

                                    </div>
                                    {/* Hover overlay */}
                                    <div className="case-image-overlay absolute inset-0 bg-[var(--bg-primary)]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                        <div className="p-4 bg-[var(--accent-primary)] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                            <ArrowUpRight size={24} className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {featuredCases[0].tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="font-display text-3xl lg:text-4xl font-bold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                                        {featuredCases[0].title}
                                    </h3>

                                    <p className="text-[var(--text-secondary)] text-lg mb-6">
                                        {featuredCases[0].subtitle}
                                    </p>

                                    <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                                        {t('cases.viewCase') as string}
                                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.article>

                {/* Other Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredCases.slice(1).map((caseItem) => (
                        <motion.article
                            key={caseItem.id}
                            className="case-card group"
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={`/case-studies/${caseItem.id}`}>
                                <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all h-full">
                                    {/* Image with Zoom Effect */}
                                    <div className="case-image-wrapper relative aspect-[4/3]">
                                        <div className={`case-image-bg absolute inset-0 bg-gradient-to-br ${caseItem.gradient}`}>
                                            {/* Grid pattern */}
                                            <div
                                                className="absolute inset-0 opacity-[0.1]"
                                                style={{
                                                    backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                        `,
                                                    backgroundSize: '30px 30px',
                                                }}
                                            />

                                        </div>
                                        {/* Hover overlay */}
                                        <div className="case-image-overlay absolute inset-0 bg-[var(--bg-primary)]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                            <div className="p-3 bg-[var(--accent-primary)] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                <ArrowUpRight size={20} className="text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {caseItem.title}
                                        </h3>
                                        <p className="text-[var(--text-secondary)] text-sm">
                                            {caseItem.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedCases;

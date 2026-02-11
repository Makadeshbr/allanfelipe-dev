/**
 * ============================================
 * COMPONENT: Case Slider - Fullwidth
 * ============================================
 * 
 * Slider horizontal de borda a borda
 * Estilo exato do 1minus1.com
 */

'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Cases para o slider
const sliderCases = [
    {
        id: 'fintech-dashboard',
        title: 'Fintech Dashboard',
        client: 'Nova Invest',
        description: 'Dashboard financeiro com gráficos em tempo real',
        gradient: 'from-blue-600/50 to-indigo-700/40',
    },
    {
        id: 'barbershop-site',
        title: 'BarberShop Site',
        client: 'Império Barbearia',
        description: 'Site profissional com agendamento online',
        gradient: 'from-amber-600/50 to-yellow-700/40',
    },
    {
        id: 'saas-platform',
        title: 'SaaS Platform',
        client: 'TechCorp',
        description: 'Plataforma de gestão empresarial',
        gradient: 'from-cyan-600/50 to-blue-700/40',
    },
    {
        id: 'mobile-app',
        title: 'Mobile Banking',
        client: 'DigitalBank',
        description: 'App de banco digital com biometria',
        gradient: 'from-slate-600/50 to-gray-700/40',
    },
    {
        id: 'corporate-website',
        title: 'Corporate Website',
        client: 'Enterprise Co',
        description: 'Site institucional responsivo',
        gradient: 'from-zinc-600/50 to-neutral-700/40',
    },
];

const CARD_WIDTH = 420;
const CARD_GAP = 24;

export function CaseSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const x = useMotionValue(0);

    const maxScroll = (sliderCases.length - 1) * (CARD_WIDTH + CARD_GAP);

    const goToSlide = (index: number) => {
        const clampedIndex = Math.max(0, Math.min(index, sliderCases.length - 1));
        setActiveIndex(clampedIndex);
        animate(x, -clampedIndex * (CARD_WIDTH + CARD_GAP), {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        });
    };

    const handleDragEnd = (_: never, info: { offset: { x: number }; velocity: { x: number } }) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        // Determine direction based on offset and velocity
        if (offset < -50 || velocity < -500) {
            goToSlide(activeIndex + 1);
        } else if (offset > 50 || velocity > 500) {
            goToSlide(activeIndex - 1);
        } else {
            goToSlide(activeIndex);
        }
    };

    // Progress indicator
    const progress = useTransform(x, [-maxScroll, 0], [100, 0]);

    return (
        <section className="py-32 overflow-hidden bg-[var(--bg-primary)]">
            {/* Header */}
            <div className="container mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <p className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium mb-4">
                            Portfolio
                        </p>
                        <h2 className="font-display text-h2 font-bold">
                            Casos de sucesso<span className="text-[var(--text-muted)]">.</span>
                        </h2>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => goToSlide(activeIndex - 1)}
                            disabled={activeIndex === 0}
                            className="p-4 rounded-full border border-white/10 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => goToSlide(activeIndex + 1)}
                            disabled={activeIndex === sliderCases.length - 1}
                            className="p-4 rounded-full border border-white/10 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider - Fullwidth */}
            <div ref={containerRef} className="relative">
                <motion.div
                    className="flex gap-6 pl-8 md:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -maxScroll, right: 0 }}
                    onDragEnd={handleDragEnd}
                    dragElastic={0.1}
                >
                    {sliderCases.map((caseItem, index) => (
                        <motion.article
                            key={caseItem.id}
                            className="flex-shrink-0 group"
                            style={{ width: CARD_WIDTH }}
                            whileHover={{ y: -12 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={`/case-studies/${caseItem.id}`} draggable={false}>
                                <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all">
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
                                                    backgroundSize: '40px 40px',
                                                }}
                                            />

                                            {/* Number overlay */}
                                            <div className="absolute bottom-4 right-4 font-display text-6xl font-bold text-white/10">
                                                0{index + 1}
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
                                    <div className="p-6">
                                        <p className="text-[var(--text-muted)] text-sm mb-2">{caseItem.client}</p>
                                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {caseItem.title}
                                        </h3>
                                        <p className="text-[var(--text-secondary)] text-sm">
                                            {caseItem.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}

                    {/* Spacer for last item */}
                    <div className="flex-shrink-0 w-8" />
                </motion.div>
            </div>

            {/* Progress bar */}
            <div className="container mt-8">
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--accent-primary)]"
                        style={{ width: progress.get() + '%' }}
                    />
                </div>

                {/* Index indicator */}
                <div className="flex justify-between mt-4 text-sm">
                    <span className="text-[var(--text-muted)]">
                        0{activeIndex + 1} / 0{sliderCases.length}
                    </span>
                    <Link
                        href="/projects"
                        className="text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                    >
                        Ver todos os projetos
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CaseSlider;

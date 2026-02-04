/**
 * ============================================
 * COMPONENT: Hero - Professional Edition
 * ============================================
 * 
 * Hero section com paleta azul profissional
 * Layout exato do 1minus1.com
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';
import { ShowreelModal } from '@/components/ui';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showreelOpen, setShowreelOpen] = useState(false);
    const { t } = useLanguage();

    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const rotatingRef = useRef<HTMLDivElement>(null);

    const rotatingWords = t('rotatingWords') as string[];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [rotatingWords.length]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            if (taglineRef.current) {
                tl.fromTo(
                    taglineRef.current.querySelector('.tagline-text'),
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
                    0
                );
            }

            if (headlineRef.current) {
                const lines = headlineRef.current.querySelectorAll('.headline-line');
                lines.forEach((line, i) => {
                    tl.fromTo(
                        line,
                        { y: '100%' },
                        { y: '0%', duration: 1.2, ease: 'power4.out' },
                        0.1 + i * 0.15
                    );
                });
            }

            if (rotatingRef.current) {
                tl.fromTo(
                    rotatingRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
                    0.8
                );
            }

            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
                    1
                );
            }

            // Parallax
            gsap.to('.hero-bg-pattern', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to('.hero-content', {
                yPercent: 20,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
            });

            gsap.to('.hero-glow', {
                scale: 1.2,
                opacity: 0.6,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToNext = () => {
        const nextSection = document.getElementById('services');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section
                ref={containerRef}
                className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[#0d0d14] to-[var(--bg-primary)]" />

                {/* Grid pattern */}
                <div
                    className="hero-bg-pattern absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(79,140,255,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(79,140,255,0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: '100px 100px',
                    }}
                />

                {/* Glow */}
                <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-tertiary)]/10 blur-[150px]" />

                {/* Content */}
                <div className="hero-content container relative z-10 pt-32 pb-20">
                    {/* Tagline */}
                    <div ref={taglineRef} className="overflow-hidden mb-8">
                        <p className="tagline-text text-[var(--accent-primary)] text-xs uppercase tracking-[0.6em] font-medium">
                            {t('hero.tagline') as string}
                        </p>
                    </div>

                    {/* Headline - Tipografia impactante estilo 1minus1 */}
                    <div ref={headlineRef} className="mb-10">
                        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight">
                            <div className="overflow-hidden">
                                <span className="headline-line block text-[var(--text-primary)]">
                                    {t('hero.title.line1') as string}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="headline-line block text-gradient">
                                    {t('hero.title.line2') as string}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="headline-line block text-[var(--text-muted)]">
                                    {t('hero.title.line3') as string}
                                </span>
                            </div>
                        </h1>
                    </div>

                    {/* Showreel button */}
                    <div ref={rotatingRef} className="mb-10">
                        <button
                            onClick={() => setShowreelOpen(true)}
                            className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"
                        >
                            <div className="relative w-14 h-14 rounded-full border-2 border-current flex items-center justify-center group-hover:border-[var(--accent-primary)] transition-colors">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Play size={20} className="fill-current ml-1" />
                                </motion.div>
                            </div>
                            <span className="text-sm uppercase tracking-widest font-medium">
                                {t('hero.showreel') as string}
                            </span>
                        </button>
                    </div>

                    {/* Rotating Words */}
                    <div ref={ctaRef} className="flex flex-wrap items-center gap-3 text-xl md:text-2xl text-[var(--text-secondary)]">
                        <span>{t('hero.specializedIn') as string}</span>
                        <div className="relative h-12 w-72 overflow-hidden flex items-center" style={{ perspective: '500px' }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentWordIndex}
                                    initial={{ y: 50, opacity: 0, rotateX: -60 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -50, opacity: 0, rotateX: 60 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute text-gradient font-semibold"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {rotatingWords[currentWordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    onClick={scrollToNext}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors group cursor-pointer"
                    aria-label="Scroll para baixo"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
                        {t('hero.scroll') as string}
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown size={24} strokeWidth={1} />
                    </motion.div>
                </motion.button>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
            </section>

            <ShowreelModal
                isOpen={showreelOpen}
                onClose={() => setShowreelOpen(false)}
            />
        </>
    );
}

export default Hero;

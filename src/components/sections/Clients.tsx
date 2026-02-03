/**
 * ============================================
 * COMPONENT: Clients Section - Simplificado
 * ============================================
 * 
 * Versão minimalista conforme auditoria UX
 * Menos ruído visual, mais elegante
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const clientTypes = [
    'Startups',
    'Agências',
    'E-commerce',
    'SaaS',
    'Fintechs',
    'Healthtech',
];

export function Clients() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animation
            gsap.fromTo(
                '.client-item',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-[var(--bg-secondary)] border-y border-white/5">
            <div className="container">
                {/* Header minimalista */}
                <div className="text-center mb-12">
                    <p className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.3em] mb-4">
                        Experiência em
                    </p>
                    <h2 className="font-display text-h2 font-bold">
                        Diversos <span className="text-gradient">nichos</span>
                    </h2>
                </div>

                {/* Lista simples e elegante */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {clientTypes.map((client) => (
                        <motion.div
                            key={client}
                            className="client-item"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="px-6 py-3 bg-[var(--bg-card)] rounded-full border border-white/5 hover:border-[var(--accent-primary)]/30 transition-colors">
                                <span className="text-[var(--text-secondary)] font-medium">
                                    {client}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Clients;

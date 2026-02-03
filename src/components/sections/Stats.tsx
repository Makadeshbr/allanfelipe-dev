/**
 * ============================================
 * COMPONENT: Stats - Professional
 * ============================================
 * 
 * Métricas de resultado com destaque
 * Estilo "Results are everything" do 1minus1
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Code, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    {
        icon: TrendingUp,
        value: 40,
        suffix: '%',
        label: 'Aumento em conversão',
        description: 'Média de melhoria em projetos',
    },
    {
        icon: Users,
        value: 50,
        suffix: '+',
        label: 'Clientes atendidos',
        description: 'Startups e empresas',
    },
    {
        icon: Code,
        value: 100,
        suffix: '+',
        label: 'Projetos entregues',
        description: 'Web e mobile',
    },
    {
        icon: Award,
        value: 5,
        suffix: '+',
        label: 'Anos de experiência',
        description: 'Full-stack development',
    },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = value;
                    const duration = 2000;
                    const startTime = Date.now();

                    const animate = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(eased * end);

                        setCount(current);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export function Stats() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.fromTo(
                '.stats-header',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Stats cards stagger
            gsap.fromTo(
                '.stat-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.stats-grid',
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section bg-[var(--bg-secondary)] relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/5 to-transparent pointer-events-none" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="stats-header max-w-3xl mb-16">
                    <p className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium mb-4">
                        Results are everything
                    </p>
                    <h2 className="font-display text-h1 font-bold mb-4">
                        Resultados que{' '}
                        <span className="text-gradient">fazem a diferença.</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg">
                        De websites premiados a experiências complexas, ajudo empresas a
                        usar a web para crescer, converter e alcançar novos mercados.
                    </p>
                </div>

                {/* Stats Grid - Gap aumentado */}
                <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="stat-card group relative p-8 rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all"
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                    <stat.icon size={24} className="text-[var(--accent-primary)]" />
                                </div>
                            </div>

                            {/* Number */}
                            <div className="font-display text-5xl font-bold mb-2 text-[var(--text-primary)]">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>

                            {/* Label */}
                            <h3 className="font-medium text-[var(--text-primary)] mb-1">
                                {stat.label}
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Stats;

/**
 * ============================================
 * COMPONENT: Services - Professional
 * ============================================
 * 
 * Grid de serviços com ícones e descrições
 * Layout exato do 1minus1.com
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Palette, Clapperboard, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        icon: Globe,
        title: 'Websites',
        items: [
            'Landing pages',
            'Sites institucionais',
            'Web experiences',
        ],
    },
    {
        icon: Palette,
        title: 'Design',
        items: [
            'UI/UX Design',
            'Web design',
            'Design systems',
        ],
    },
    {
        icon: Clapperboard,
        title: 'Apps',
        items: [
            'React Native',
            'Next.js Apps',
            'PWAs',
        ],
    },
    {
        icon: TrendingUp,
        title: 'Growth',
        items: [
            'SEO técnico',
            'Performance',
            'Analytics',
        ],
    },
];

export function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            const headerLines = sectionRef.current?.querySelectorAll('.header-reveal');
            headerLines?.forEach((line, i) => {
                gsap.fromTo(
                    line,
                    { y: '100%' },
                    {
                        y: '0%',
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                        },
                        delay: i * 0.1,
                    }
                );
            });

            // Service cards stagger
            gsap.fromTo(
                '.service-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="section bg-[var(--bg-secondary)]">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl mb-20">
                    <div className="overflow-hidden mb-4">
                        <p className="header-reveal text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            What we do
                        </p>
                    </div>

                    <h2 className="font-display text-h1 font-bold mb-6">
                        <div className="overflow-hidden">
                            <span className="header-reveal block">Full-Stack Developer</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="header-reveal block text-gradient">especializado em resultados.</span>
                        </div>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            className="service-card group p-8 rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all"
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                <service.icon size={28} className="text-[var(--accent-primary)]" />
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-xl font-bold mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                                {service.title}
                            </h3>

                            {/* Items */}
                            <ul className="space-y-2">
                                {service.items.map((item) => (
                                    <li key={item} className="text-[var(--text-secondary)] text-sm">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-2xl bg-[var(--bg-card)] border border-white/5">
                    <div>
                        <h3 className="font-display text-xl font-bold mb-2">
                            Resultados são tudo. Simples assim.
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                            De websites a aplicações complexas, ajudo empresas a crescer através da tecnologia.
                        </p>
                    </div>

                    <Link href="/services" className="btn btn-primary whitespace-nowrap">
                        Ver Serviços
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Services;

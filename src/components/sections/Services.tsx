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
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Chaves dos serviços para mapear ícones
const serviceKeys = [
    { key: 'websites', icon: Globe },
    { key: 'design', icon: Palette },
    { key: 'apps', icon: Clapperboard },
    { key: 'growth', icon: TrendingUp },
];

export function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

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

    // Gera lista de serviços traduzida
    const services = serviceKeys.map(({ key, icon }) => ({
        icon,
        title: t(`services.items.${key}.title`),
        items: t(`services.items.${key}.items`) as string[],
    }));

    return (
        <section ref={sectionRef} id="services" className="section bg-[var(--bg-secondary)]">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl mb-20">
                    <div className="overflow-hidden mb-4">
                        <p className="header-reveal text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            {t('services.subtitle') as string}
                        </p>
                    </div>

                    <h2 className="font-display text-h1 font-bold mb-6">
                        <div className="overflow-hidden">
                            <span className="header-reveal block">{t('services.title.line1') as string}</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="header-reveal block text-gradient">{t('services.title.line2') as string}</span>
                        </div>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {services.map((service) => (
                        <motion.div
                            key={service.title as string}
                            className="service-card group rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all"
                            style={{ padding: '3rem' }}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                <service.icon size={28} className="text-[var(--accent-primary)]" />
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-xl font-bold mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                                {service.title as string}
                            </h3>

                            {/* Items */}
                            <ul className="space-y-3">
                                {service.items && service.items.map((item) => (
                                    <li key={item} className="text-[var(--text-secondary)] text-sm leading-relaxed">
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
                            {t('services.cta.title') as string}
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                            {t('services.cta.description') as string}
                        </p>
                    </div>

                    <Link href="/services" className="btn btn-primary whitespace-nowrap">
                        {t('services.cta.button') as string}
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Services;

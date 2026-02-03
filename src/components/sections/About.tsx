/**
 * ============================================
 * COMPONENT: About - ENHANCED
 * ============================================
 * 
 * Seção sobre com animações mais dramáticas
 */

'use client';

import { motion, useInView, BezierDefinition } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Cpu, Palette, Rocket } from 'lucide-react';
import { techStack } from '@/data/site-data';

/** Easing dramático */
const dramaticEase: BezierDefinition = [0.16, 1, 0.3, 1];

const capabilities = [
    {
        icon: <Code2 size={24} />,
        title: 'Código Limpo',
        description: 'TypeScript, padrões SOLID, testes e documentação.',
    },
    {
        icon: <Palette size={24} />,
        title: 'Design & UX',
        description: 'Interfaces modernas, responsivas e intuitivas.',
    },
    {
        icon: <Cpu size={24} />,
        title: 'Performance',
        description: 'Otimização, SEO técnico e Core Web Vitals.',
    },
    {
        icon: <Rocket size={24} />,
        title: 'Deploy & DevOps',
        description: 'CI/CD, containers e cloud infrastructure.',
    },
];

export function About() {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    const contentRef = useRef<HTMLDivElement>(null);
    const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

    const techRef = useRef<HTMLDivElement>(null);
    const isTechInView = useInView(techRef, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--accent-primary)]/5 rounded-full blur-[200px] translate-x-1/2" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left - Content */}
                    <div ref={headerRef}>
                        {/* Header */}
                        <div className="overflow-hidden mb-4">
                            <motion.p
                                initial={{ y: '100%' }}
                                animate={isHeaderInView ? { y: 0 } : { y: '100%' }}
                                transition={{ duration: 0.8, ease: dramaticEase }}
                                className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.4em] font-medium"
                            >
                                Sobre mim
                            </motion.p>
                        </div>

                        <div className="overflow-hidden mb-2">
                            <motion.h2
                                initial={{ y: '100%' }}
                                animate={isHeaderInView ? { y: 0 } : { y: '100%' }}
                                transition={{ duration: 1, ease: dramaticEase, delay: 0.1 }}
                                className="font-display text-h1 font-bold"
                            >
                                Ideias criativas,
                            </motion.h2>
                        </div>
                        <div className="overflow-hidden mb-8">
                            <motion.h2
                                initial={{ y: '100%' }}
                                animate={isHeaderInView ? { y: 0 } : { y: '100%' }}
                                transition={{ duration: 1, ease: dramaticEase, delay: 0.2 }}
                                className="font-display text-h1 font-bold text-gradient"
                            >
                                execução impecável.
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.8, ease: dramaticEase, delay: 0.4 }}
                            className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12"
                        >
                            Sou desenvolvedor Full-Stack apaixonado por criar experiências digitais
                            que fazem a diferença. Do conceito ao deploy, transformo ideias em
                            produtos funcionais, escaláveis e visualmente impressionantes.
                        </motion.p>

                        {/* Capabilities Grid */}
                        <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {capabilities.map((cap, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: dramaticEase,
                                        delay: index * 0.1,
                                    }}
                                    className="flex gap-4 group"
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {cap.icon}
                                    </motion.div>
                                    <div>
                                        <h4 className="font-display font-semibold mb-1 group-hover:text-gradient transition-colors duration-300">
                                            {cap.title}
                                        </h4>
                                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                            {cap.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Tech Stack Card */}
                    <motion.div
                        ref={techRef}
                        initial={{ opacity: 0, x: 100 }}
                        animate={isTechInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                        transition={{ duration: 1, ease: dramaticEase }}
                        className="lg:sticky lg:top-32"
                    >
                        <motion.div
                            className="bg-[var(--bg-card)] rounded-3xl p-10 border border-white/5"
                            whileHover={{ borderColor: 'rgba(0, 255, 136, 0.2)' }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="font-display text-2xl font-bold mb-8">
                                Tech Stack
                            </h3>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {techStack.map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isTechInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{
                                            delay: 0.3 + index * 0.03,
                                            duration: 0.4,
                                            ease: [0.34, 1.56, 0.64, 1],
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: 'rgba(0, 255, 136, 0.2)',
                                            color: 'var(--accent-primary)',
                                        }}
                                        className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg text-sm cursor-default transition-colors duration-300"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Stats mini */}
                            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isTechInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.8, duration: 0.6, ease: dramaticEase }}
                                >
                                    <div className="font-display text-4xl font-bold text-gradient mb-1">
                                        2+
                                    </div>
                                    <p className="text-[var(--text-muted)] text-sm">
                                        Anos de experiência
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isTechInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.9, duration: 0.6, ease: dramaticEase }}
                                >
                                    <div className="font-display text-4xl font-bold text-gradient mb-1">
                                        12+
                                    </div>
                                    <p className="text-[var(--text-muted)] text-sm">
                                        Projetos entregues
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;

/**
 * ============================================
 * PROJECTS PAGE - /projects
 * ============================================
 * 
 * Grid de projetos com filtros
 * Baseado no 1minus1.com/projects
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/site-data';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const categories = ['Todos', 'Web', 'Mobile', 'Full-Stack', 'Landing'];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeFilter === 'Todos'
        ? projects
        : projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

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
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!gridRef.current) return;

        const cards = gridRef.current.querySelectorAll('.project-card');
        cards.forEach((card) => {
            gsap.fromTo(
                card,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    },
                }
            );
        });
    }, [filteredProjects]);

    return (
        <>
            {/* Hero */}
            <section ref={heroRef} className="min-h-[50vh] flex items-center pt-32 pb-12 bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="overflow-hidden mb-4">
                        <p className="reveal-line text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                            Portfolio
                        </p>
                    </div>

                    <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] mb-8">
                        <div className="overflow-hidden">
                            <span className="reveal-line block">Projetos em</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="reveal-line block text-gradient">Destaque</span>
                        </div>
                    </h1>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-[var(--text-secondary)] text-xl max-w-2xl"
                    >
                        Design, desenvolvimento e resultados. Cada projeto conta uma história de transformação digital.
                    </motion.p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-10 bg-[var(--bg-secondary)] border-y border-white/5">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-12">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gradient">12+</div>
                            <div className="text-[var(--text-muted)] text-sm">Projetos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gradient">100%</div>
                            <div className="text-[var(--text-muted)] text-sm">Satisfação</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gradient">2+</div>
                            <div className="text-[var(--text-muted)] text-sm">Anos</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-12 bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === cat
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section bg-[var(--bg-primary)] pt-8">
                <div className="container">
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence mode="wait">
                            {filteredProjects.map((project, index) => (
                                <motion.article
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className={`project-card group ${index === 0 ? 'md:col-span-2' : ''}`}
                                >
                                    <motion.div
                                        className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/5"
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Image */}
                                        <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                                            {project.image ? (
                                                <>
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                    />
                                                    {/* Dark overlay for text readability */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/30 via-[var(--accent-tertiary)]/20 to-[var(--bg-card)]">
                                                    {/* Grid pattern */}
                                                    <div
                                                        className="absolute inset-0 opacity-[0.08]"
                                                        style={{
                                                            backgroundImage: `
                              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                            `,
                                                            backgroundSize: '40px 40px',
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* Category badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-4 py-1.5 bg-[var(--bg-primary)]/80 backdrop-blur-sm rounded-full text-xs font-medium text-[var(--accent-primary)]">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Hover overlay with links */}
                                            <div className="absolute inset-0 bg-[var(--bg-primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                                <motion.a
                                                    href="#"
                                                    className="p-4 bg-[var(--accent-primary)] rounded-full text-[var(--bg-primary)]"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    <ExternalLink size={20} />
                                                </motion.a>
                                                <motion.a
                                                    href="#"
                                                    className="p-4 bg-white/10 backdrop-blur-sm rounded-full text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    <Github size={20} />
                                                </motion.a>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                                {project.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-[var(--text-secondary)] text-sm mb-4">
                                                {project.description}
                                            </p>

                                            {/* CTA */}
                                            <a
                                                href={`/case-studies/${project.id}`}
                                                className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)]"
                                            >
                                                Ver Case Study
                                                <ArrowUpRight size={16} />
                                            </a>
                                        </div>
                                    </motion.div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container text-center">
                    <h2 className="font-display text-h1 font-bold mb-4">
                        Tem um <span className="text-gradient">Projeto</span> em Mente?
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                        Vamos transformar sua ideia em realidade digital.
                    </p>
                    <motion.a
                        href="/#contact"
                        className="btn btn-primary inline-flex"
                        whileHover={{ scale: 1.05 }}
                    >
                        Iniciar Conversa
                    </motion.a>
                </div>
            </section>
        </>
    );
}

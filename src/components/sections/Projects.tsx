/**
 * ============================================
 * COMPONENT: Projects - With Real Images
 * ============================================
 * 
 * Grid de projetos com imagens reais
 * Filtros por categoria
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/site-data';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const categories = ['Todos', 'Web', 'Mobile', 'SaaS', 'E-commerce'];

// Map projects to images
const projectImages: Record<string, string> = {
    'fintech-dashboard': '/images/cases/dashboard.png',
    'mobile-banking': '/images/cases/mobile.png',
    'ecommerce-platform': '/images/cases/ecommerce.png',
};

export function Projects() {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const sectionRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeFilter === 'Todos'
        ? projects
        : projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())));

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.project-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.projects-grid',
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [activeFilter]);

    return (
        <section ref={sectionRef} id="projects" className="section bg-[var(--bg-primary)]">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
                    <div>
                        <p className="text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium mb-4">
                            Portfolio
                        </p>
                        <h2 className="font-display text-h1 font-bold">
                            Projetos <span className="text-gradient">selecionados</span>
                        </h2>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === cat
                                        ? 'bg-[var(--accent-primary)] text-white'
                                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="project-card group"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-all">
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        {projectImages[project.id] ? (
                                            <Image
                                                src={projectImages[project.id]}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-blue-600/40 to-indigo-700/30'}`}>
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
                                            </div>
                                        )}

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-[var(--bg-primary)]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-[var(--accent-primary)] rounded-full text-white hover:scale-110 transition-transform"
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:scale-110 transition-transform"
                                                >
                                                    <Github size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <Link
                                            href={`/case-studies/${project.id}`}
                                            className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:gap-3 transition-all"
                                        >
                                            Ver Case Study
                                            <ArrowUpRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Stats bar */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[var(--bg-card)] border border-white/5">
                    <div className="text-center">
                        <p className="font-display text-3xl font-bold text-gradient">100+</p>
                        <p className="text-[var(--text-muted)] text-sm">Projetos</p>
                    </div>
                    <div className="text-center">
                        <p className="font-display text-3xl font-bold text-gradient">50+</p>
                        <p className="text-[var(--text-muted)] text-sm">Clientes</p>
                    </div>
                    <div className="text-center">
                        <p className="font-display text-3xl font-bold text-gradient">5+</p>
                        <p className="text-[var(--text-muted)] text-sm">Anos</p>
                    </div>
                    <div className="text-center">
                        <p className="font-display text-3xl font-bold text-gradient">3</p>
                        <p className="text-[var(--text-muted)] text-sm">Países</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;

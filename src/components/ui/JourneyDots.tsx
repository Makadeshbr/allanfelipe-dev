'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Section {
    id: string;
    label: string;
}

interface JourneyDotsProps {
    sections: Section[];
}

export function JourneyDots({ sections }: JourneyDotsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const dotsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hide on mobile
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        // Show dots after a delay
        const showTimer = setTimeout(() => setIsVisible(true), 2000);

        // Track scroll position to determine active section
        const triggers: ScrollTrigger[] = [];

        sections.forEach((section, index) => {
            const el = document.getElementById(section.id);
            if (!el) return;

            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index),
            });

            triggers.push(trigger);
        });

        return () => {
            clearTimeout(showTimer);
            triggers.forEach((t) => t.kill());
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Don't render on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <motion.div
            ref={dotsRef}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 hidden md:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                x: isVisible ? 0 : 20,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {sections.map((section, index) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group relative flex items-center justify-end"
                    aria-label={`Navigate to ${section.label}`}
                >
                    {/* Label on hover */}
                    <motion.span
                        className="absolute right-6 text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            opacity: activeIndex === index ? 0.6 : 0,
                        }}
                    >
                        {section.label}
                    </motion.span>

                    {/* Dot */}
                    <motion.div
                        className="relative"
                        animate={{
                            scale: activeIndex === index ? 1.5 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full transition-colors duration-300"
                            style={{
                                backgroundColor: activeIndex === index
                                    ? 'var(--accent-primary)'
                                    : 'var(--text-muted)',
                            }}
                        />

                        {/* Active ring */}
                        {activeIndex === index && (
                            <motion.div
                                className="absolute inset-0 rounded-full border border-[var(--accent-primary)]"
                                initial={{ scale: 1, opacity: 0 }}
                                animate={{ scale: 2.5, opacity: [0, 0.6, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                            />
                        )}
                    </motion.div>
                </button>
            ))}

            {/* Progress line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 -z-10">
                <motion.div
                    className="w-full bg-[var(--accent-primary)]/30 origin-top"
                    style={{
                        height: `${((activeIndex + 1) / sections.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </div>
        </motion.div>
    );
}

export default JourneyDots;

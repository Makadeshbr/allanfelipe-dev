/**
 * ============================================
 * COMPONENT: Parallax Section
 * ============================================
 * 
 * Seção com efeito parallax no scroll
 * Cria profundidade visual estilo 1minus1
 */

'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    speed?: number; // 0.5 = mais lento, 1.5 = mais rápido
    direction?: 'up' | 'down';
}

export function ParallaxSection({
    children,
    className = '',
    speed = 0.5,
    direction = 'up',
}: ParallaxSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const distance = 100 * speed;
        const yStart = direction === 'up' ? distance : -distance;
        const yEnd = direction === 'up' ? -distance : distance;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { y: yStart },
                {
                    y: yEnd,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [speed, direction]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <div ref={contentRef}>{children}</div>
        </div>
    );
}

export default ParallaxSection;

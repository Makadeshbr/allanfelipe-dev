/**
 * ============================================
 * COMPONENT: Text Reveal Animation
 * ============================================
 * 
 * Texto que revela linha por linha com GSAP
 * Estilo 1minus1.com de reveal dramático
 */

'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    scrub?: boolean;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({
    children,
    className = '',
    delay = 0,
    scrub = false,
    tag: Tag = 'span',
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                {
                    y: '100%',
                    opacity: 0,
                },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 1.2,
                    delay,
                    ease: 'power4.out',
                    scrollTrigger: scrub
                        ? {
                            trigger: containerRef.current,
                            start: 'top 85%',
                            end: 'top 50%',
                            scrub: 1,
                        }
                        : {
                            trigger: containerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [delay, scrub]);

    return (
        <div ref={containerRef} className="overflow-hidden">
            <Tag ref={textRef as React.RefObject<HTMLSpanElement>} className={`block ${className}`}>
                {children}
            </Tag>
        </div>
    );
}

export default TextReveal;

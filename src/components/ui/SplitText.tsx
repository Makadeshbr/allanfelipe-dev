'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

/**
 * SplitText - Componente que anima texto palavra por palavra
 * Inspirado no 1minus1.com com animação stagger suave
 * 
 * Usage:
 * <SplitText>
 *   Seu texto aqui será animado
 * </SplitText>
 */

interface SplitTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    splitBy?: 'word' | 'char' | 'line';
}

export function SplitText({
    children,
    className = '',
    delay = 0,
    stagger = 0.08,
    duration = 1,
    as: Component = 'div',
    splitBy = 'word',
}: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const text = containerRef.current.textContent || '';
        let elements: string[] = [];

        // Split based on type
        if (splitBy === 'word') {
            elements = text.split(' ');
        } else if (splitBy === 'char') {
            elements = text.split('');
        } else {
            elements = text.split('\n');
        }

        // Create wrapped elements
        const wrappedHTML = elements
            .map(
                (el, i) =>
                    `<span class="split-wrapper inline-block overflow-hidden"><span class="split-item inline-block" style="opacity: 0; transform: translateY(100%)">${el}${splitBy === 'word' ? '&nbsp;' : ''}</span></span>`
            )
            .join('');

        containerRef.current.innerHTML = wrappedHTML;

        // Animate
        const items = containerRef.current.querySelectorAll('.split-item');
        gsap.to(items, {
            y: '0%',
            opacity: 1,
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: 'expo.out',
        });

        // Cleanup
        return () => {
            gsap.killTweensOf(items);
        };
    }, [children, delay, stagger, duration, splitBy]);

    return (
        <Component ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
            {children}
        </Component>
    );
}

/**
 * AnimatedHeadline - Versão especializada para headlines grandes
 * Com animação de máscara e reveal dramático
 */
interface AnimatedHeadlineProps {
    lines: string[];
    className?: string;
    delay?: number;
    highlightLast?: boolean;
}

export function AnimatedHeadline({
    lines,
    className = '',
    delay = 0.2,
    highlightLast = true,
}: AnimatedHeadlineProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const lineElements = containerRef.current.querySelectorAll('.headline-line');

        lineElements.forEach((line, i) => {
            gsap.fromTo(
                line,
                { y: '110%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 1.2,
                    delay: delay + i * 0.15,
                    ease: 'expo.out',
                }
            );
        });

        return () => {
            gsap.killTweensOf(lineElements);
        };
    }, [lines, delay]);

    return (
        <h1 ref={containerRef} className={className}>
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                    <span
                        className={`headline-line block ${highlightLast && i === lines.length - 1 ? 'text-gradient' : ''
                            }`}
                        style={{ opacity: 0, transform: 'translateY(110%)' }}
                    >
                        {line}
                    </span>
                </div>
            ))}
        </h1>
    );
}

/**
 * RevealText - Texto que aparece com efeito de máscara
 */
interface RevealTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: delay,
                ease: 'power4.out',
            }
        );
    }, [delay]);

    return (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}

export default SplitText;

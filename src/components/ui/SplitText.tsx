'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    splitBy?: 'word' | 'char' | 'line';
    effect?: 'default' | 'warp';
    scrollTrigger?: boolean;
}

export function SplitText({
    children,
    className = '',
    delay = 0,
    stagger = 0.08,
    duration = 1,
    as: Component = 'div',
    splitBy = 'word',
    effect = 'default',
    scrollTrigger = false,
}: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const text = containerRef.current.textContent || '';
        let elements: string[] = [];

        if (splitBy === 'word') {
            elements = text.split(' ');
        } else if (splitBy === 'char') {
            elements = text.split('');
        } else {
            elements = text.split('\n');
        }

        const wrappedHTML = elements
            .map(
                (el) =>
                    `<span class="split-wrapper inline-block overflow-hidden"><span class="split-item inline-block" style="opacity: 0; transform: translateY(100%)${effect === 'warp' ? ' rotate(-3deg)' : ''}">${el}${splitBy === 'word' ? '&nbsp;' : ''}</span></span>`
            )
            .join('');

        containerRef.current.innerHTML = wrappedHTML;

        const items = containerRef.current.querySelectorAll('.split-item');

        const fromVars = effect === 'warp'
            ? { y: '100%', opacity: 0, rotation: -3 }
            : { y: '100%', opacity: 0 };

        const toVars: gsap.TweenVars = {
            y: '0%',
            opacity: 1,
            rotation: 0,
            duration: effect === 'warp' ? 1.2 : duration,
            stagger: stagger,
            delay: delay,
            ease: effect === 'warp' ? 'power4.out' : 'expo.out',
        };

        if (scrollTrigger) {
            toVars.scrollTrigger = {
                trigger: containerRef.current,
                start: 'top 85%',
            };
        }

        gsap.fromTo(items, fromVars, toVars);

        return () => {
            gsap.killTweensOf(items);
        };
    }, [children, delay, stagger, duration, splitBy, effect, scrollTrigger]);

    return (
        <Component ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
            {children}
        </Component>
    );
}

/**
 * AnimatedHeadline - Headlines with line-by-line reveal
 */
interface AnimatedHeadlineProps {
    lines: string[];
    className?: string;
    delay?: number;
    highlightLast?: boolean;
    effect?: 'default' | 'warp';
}

export function AnimatedHeadline({
    lines,
    className = '',
    delay = 0.2,
    highlightLast = true,
    effect = 'default',
}: AnimatedHeadlineProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const lineElements = containerRef.current.querySelectorAll('.headline-line');

        const fromVars = effect === 'warp'
            ? { y: '110%', opacity: 0, rotation: -3 }
            : { y: '110%', opacity: 0 };

        lineElements.forEach((line, i) => {
            gsap.fromTo(
                line,
                fromVars,
                {
                    y: '0%',
                    opacity: 1,
                    rotation: 0,
                    duration: 1.2,
                    delay: delay + i * 0.15,
                    ease: 'power4.out',
                }
            );
        });

        return () => {
            gsap.killTweensOf(lineElements);
        };
    }, [lines, delay, effect]);

    return (
        <h1 ref={containerRef} className={className}>
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                    <span
                        className={`headline-line block ${highlightLast && i === lines.length - 1 ? 'text-gradient' : ''
                            }`}
                        style={{ opacity: 0, transform: `translateY(110%)${effect === 'warp' ? ' rotate(-3deg)' : ''}` }}
                    >
                        {line}
                    </span>
                </div>
            ))}
        </h1>
    );
}

/**
 * RevealText - Text reveal with mask effect
 */
interface RevealTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    effect?: 'default' | 'warp';
}

export function RevealText({ children, className = '', delay = 0, effect = 'default' }: RevealTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const fromVars = effect === 'warp'
            ? { y: 50, opacity: 0, rotation: -3 }
            : { y: 50, opacity: 0 };

        gsap.fromTo(
            ref.current,
            fromVars,
            {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 1,
                delay: delay,
                ease: 'power4.out',
            }
        );
    }, [delay, effect]);

    return (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}

export default SplitText;

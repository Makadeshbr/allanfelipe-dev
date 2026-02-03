/**
 * ============================================
 * COMPONENT: Reveal Image
 * ============================================
 * 
 * Imagem com reveal usando clip-path
 * Estilo 1minus1.com de wipe/reveal
 */

'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface RevealImageProps {
    src?: string;
    alt?: string;
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    children?: React.ReactNode;
}

export function RevealImage({
    src,
    alt = '',
    className = '',
    direction = 'left',
    children,
}: RevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !overlayRef.current || !contentRef.current) return;

        // Define clip-path based on direction
        const getClipPath = (start: boolean) => {
            switch (direction) {
                case 'left':
                    return start ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)';
                case 'right':
                    return start ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0%)';
                case 'up':
                    return start ? 'inset(100% 0 0 0)' : 'inset(0% 0 0 0)';
                case 'down':
                    return start ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)';
                default:
                    return start ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)';
            }
        };

        const ctx = gsap.context(() => {
            // Timeline para reveal com overlay
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // Reveal do overlay (cortina colorida)
            tl.fromTo(
                overlayRef.current,
                { clipPath: getClipPath(true) },
                {
                    clipPath: getClipPath(false),
                    duration: 0.8,
                    ease: 'power4.inOut',
                }
            );

            // Reveal do conteúdo
            tl.fromTo(
                contentRef.current,
                {
                    clipPath: getClipPath(true),
                    scale: 1.2,
                },
                {
                    clipPath: getClipPath(false),
                    scale: 1,
                    duration: 0.8,
                    ease: 'power4.out',
                },
                '-=0.5' // Overlap com overlay
            );

            // Saída do overlay
            tl.to(
                overlayRef.current,
                {
                    clipPath: direction === 'left' || direction === 'up'
                        ? 'inset(0 0 0 100%)'
                        : 'inset(0 100% 0 0)',
                    duration: 0.6,
                    ease: 'power4.inOut',
                },
                '-=0.4'
            );
        }, containerRef);

        return () => ctx.revert();
    }, [direction]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Overlay colorido (cortina) */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-[var(--accent-primary)] z-10"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
            />

            {/* Conteúdo (imagem ou children) */}
            <div
                ref={contentRef}
                className="relative"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
                {children ? (
                    children
                ) : src ? (
                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--accent-primary)]/30 to-[var(--accent-tertiary)]/20" />
                )}
            </div>
        </div>
    );
}

export default RevealImage;

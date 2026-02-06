'use client';

import { useRef, useState, useEffect, useCallback, ReactNode } from 'react';

interface GlitchTextProps {
    children: ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    trigger?: 'hover' | 'always';
    intensity?: 'low' | 'medium' | 'high';
    accentColor?: string;
}

export function GlitchText({
    children,
    className = '',
    as: Component = 'span',
    trigger = 'hover',
    intensity = 'medium',
    accentColor,
}: GlitchTextProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [isGlitching, setIsGlitching] = useState(trigger === 'always');
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const touchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleTouchStart = useCallback(() => {
        if (trigger !== 'hover') return;
        setIsGlitching(true);
        if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = setTimeout(() => setIsGlitching(false), 800);
    }, [trigger]);

    useEffect(() => {
        return () => {
            if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
        };
    }, []);

    const glitchDuration = {
        low: '0.3s',
        medium: '0.5s',
        high: '0.8s',
    };

    const skewIntensity = {
        low: '2deg',
        medium: '5deg',
        high: '10deg',
    };

    return (
        <Component
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className={`relative inline-block ${className}`}
            onMouseEnter={trigger === 'hover' && !isTouchDevice ? () => setIsGlitching(true) : undefined}
            onMouseLeave={trigger === 'hover' && !isTouchDevice ? () => setIsGlitching(false) : undefined}
            onTouchStart={trigger === 'hover' && isTouchDevice ? handleTouchStart : undefined}
            style={{ position: 'relative' }}
        >
            {/* Base text */}
            <span className="relative z-10">{children}</span>

            {/* Glitch layer 1 - offset left with accent color */}
            <span
                aria-hidden="true"
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    color: accentColor || 'var(--accent-primary)',
                    opacity: isGlitching ? 0.8 : 0,
                    animation: isGlitching
                        ? `glitch ${glitchDuration[intensity]} steps(10) infinite`
                        : 'none',
                    left: '-2px',
                    textShadow: `2px 0 ${accentColor || 'var(--accent-primary)'}`,
                }}
            >
                {children}
            </span>

            {/* Glitch layer 2 - offset right with complementary color */}
            <span
                aria-hidden="true"
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    color: 'var(--accent-tertiary)',
                    opacity: isGlitching ? 0.6 : 0,
                    animation: isGlitching
                        ? `glitch ${glitchDuration[intensity]} steps(8) infinite reverse`
                        : 'none',
                    left: '2px',
                    textShadow: '-2px 0 var(--accent-tertiary)',
                    animationDelay: '0.1s',
                }}
            >
                {children}
            </span>

            {/* Glitch overlay flash */}
            <span
                aria-hidden="true"
                className="absolute inset-0 z-30 pointer-events-none bg-[var(--accent-primary)]"
                style={{
                    opacity: 0,
                    animation: isGlitching
                        ? `glitch-overlay ${glitchDuration[intensity]} steps(4) infinite`
                        : 'none',
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Scanlines effect during glitch */}
            {isGlitching && (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        background: `repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(0, 0, 0, 0.1) 2px,
                            rgba(0, 0, 0, 0.1) 4px
                        )`,
                        opacity: 0.3,
                    }}
                />
            )}

            {/* Skew effect on container */}
            <style jsx>{`
                @media (hover: hover) {
                    :global(.glitch-active) {
                        animation: glitch-skew 0.5s steps(6) infinite;
                    }
                }
                @keyframes glitch-skew {
                    0%, 100% { transform: skewX(0deg); }
                    20% { transform: skewX(${skewIntensity[intensity]}); }
                    40% { transform: skewX(-${skewIntensity[intensity]}); }
                    60% { transform: skewX(${parseInt(skewIntensity[intensity]) / 2}deg); }
                    80% { transform: skewX(-${parseInt(skewIntensity[intensity]) / 2}deg); }
                }
            `}</style>
        </Component>
    );
}

export default GlitchText;

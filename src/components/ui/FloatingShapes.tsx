'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

/**
 * FloatingShapes - Formas geométricas flutuantes com tema Dev
 * Inspirado no 1minus1.com, adaptado para Full-Stack Developer
 * 
 * Features:
 * - Formas que representam código/tech (brackets, terminal, etc)
 * - Parallax suave com movimento do mouse
 * - Animação de flutuação contínua
 * - Glow/blur effect
 */

interface Shape {
    id: number;
    type: 'bracket' | 'terminal' | 'sphere' | 'code' | 'hexagon';
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
}

const shapes: Shape[] = [
    { id: 1, type: 'bracket', x: 10, y: 20, size: 80, delay: 0, duration: 8, color: 'var(--accent-primary)' },
    { id: 2, type: 'sphere', x: 85, y: 15, size: 120, delay: 1, duration: 10, color: 'var(--accent-secondary)' },
    { id: 3, type: 'terminal', x: 75, y: 70, size: 60, delay: 0.5, duration: 9, color: 'var(--accent-tertiary)' },
    { id: 4, type: 'code', x: 15, y: 75, size: 50, delay: 1.5, duration: 7, color: 'var(--accent-primary)' },
    { id: 5, type: 'hexagon', x: 50, y: 10, size: 100, delay: 2, duration: 11, color: 'var(--accent-secondary)' },
];

// Componentes SVG para cada forma
const BracketShape = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="80"
            fontFamily="monospace"
            fontWeight="bold"
            fill={color}
            opacity="0.15"
        >
            {'{ }'}
        </text>
    </svg>
);

const TerminalShape = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="10" y="20" width="80" height="60" rx="8" stroke={color} strokeWidth="2" opacity="0.2" />
        <path d="M25 45 L40 55 L25 65" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        <line x1="50" y1="60" x2="75" y2="60" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.2" />
    </svg>
);

const SphereShape = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
            <radialGradient id="sphereGrad" cx="30%" cy="30%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#sphereGrad)" />
        <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
);

const CodeShape = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path d="M35 30 L15 50 L35 70" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
        <path d="M65 30 L85 50 L65 70" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
        <line x1="55" y1="25" x2="45" y2="75" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.15" />
    </svg>
);

const HexagonShape = ({ size, color }: { size: number; color: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <polygon
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
            stroke={color}
            strokeWidth="2"
            fill={color}
            fillOpacity="0.05"
            opacity="0.3"
        />
    </svg>
);

const ShapeRenderer = ({ shape }: { shape: Shape }) => {
    switch (shape.type) {
        case 'bracket':
            return <BracketShape size={shape.size} color={shape.color} />;
        case 'terminal':
            return <TerminalShape size={shape.size} color={shape.color} />;
        case 'sphere':
            return <SphereShape size={shape.size} color={shape.color} />;
        case 'code':
            return <CodeShape size={shape.size} color={shape.color} />;
        case 'hexagon':
            return <HexagonShape size={shape.size} color={shape.color} />;
        default:
            return null;
    }
};

export function FloatingShapes() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

    // Parallax effect com mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animação de flutuação
    useEffect(() => {
        if (!containerRef.current) return;

        const shapeElements = containerRef.current.querySelectorAll('.floating-shape');
        shapeElements.forEach((el, i) => {
            const shape = shapes[i];
            gsap.to(el, {
                y: '+=20',
                duration: shape.duration,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: shape.delay,
            });

            // Rotação suave
            gsap.to(el, {
                rotation: 10,
                duration: shape.duration * 1.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: shape.delay + 0.5,
            });
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {shapes.map((shape) => {
                // Calcular offset baseado na posição do mouse (parallax)
                const parallaxStrength = 30;
                const offsetX = (mousePosition.x - 0.5) * parallaxStrength * (shape.size / 100);
                const offsetY = (mousePosition.y - 0.5) * parallaxStrength * (shape.size / 100);

                return (
                    <motion.div
                        key={shape.id}
                        className="floating-shape absolute"
                        style={{
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                            transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
                            filter: 'blur(0.5px)',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: shape.delay * 0.3,
                            ease: 'easeOut',
                        }}
                    >
                        <ShapeRenderer shape={shape} />
                    </motion.div>
                );
            })}

            {/* Glow effects */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
                style={{
                    background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                    left: '10%',
                    top: '20%',
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
                style={{
                    background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
                    right: '10%',
                    bottom: '20%',
                }}
            />
        </div>
    );
}

export default FloatingShapes;

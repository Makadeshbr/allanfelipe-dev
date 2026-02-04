'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedCounter - Número que conta de 0 até o valor final
 * Triggered quando entra na viewport
 */
interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            // Easing: easeOutExpo
            const eased = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}

/**
 * MagneticButton - Botão com efeito magnético no hover
 */
interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    strength?: number;
}

export function MagneticButton({
    children,
    className = '',
    href,
    onClick,
    strength = 0.3,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
            href={href}
            onClick={onClick}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
            }}
        >
            {children}
        </Component>
    );
}

/**
 * AnimatedArrow - Seta que anima no hover (para o "Read Article >")
 */
interface AnimatedArrowProps {
    className?: string;
}

export function AnimatedArrow({ className = '' }: AnimatedArrowProps) {
    return (
        <motion.span
            className={`inline-block ${className}`}
            initial={{ x: 0 }}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
        >
            →
        </motion.span>
    );
}

/**
 * UnderlineLink - Link com underline animado que desenha da esquerda
 */
interface UnderlineLinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export function UnderlineLink({ children, href, className = '' }: UnderlineLinkProps) {
    return (
        <motion.a
            href={href}
            className={`relative inline-block group ${className}`}
            whileHover="hover"
        >
            {children}
            <motion.span
                className="absolute bottom-0 left-0 h-[1px] bg-current"
                initial={{ width: '0%' }}
                variants={{
                    hover: { width: '100%' },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />
        </motion.a>
    );
}

export default AnimatedCounter;

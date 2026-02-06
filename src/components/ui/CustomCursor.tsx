/**
 * ============================================
 * COMPONENT: Custom Cursor - Enhanced
 * ============================================
 * 
 * Cursor customizado com efeito magnético
 * Mostra texto "View" ao passar por links
 * Estilo 1minus1.com
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const magneticRef = useRef<HTMLElement | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if device has touch (mobile)
        const isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);

            // Magnetic pull on hovered element
            if (magneticRef.current) {
                const rect = magneticRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.25;
                const deltaY = (e.clientY - centerY) * 0.25;
                magneticRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                magneticRef.current.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [data-cursor]');

            if (interactive) {
                setIsHovering(true);
                const customText = interactive.getAttribute('data-cursor') || 'View';
                setCursorText(customText);
                magneticRef.current = interactive as HTMLElement;
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setCursorText('');
            if (magneticRef.current) {
                magneticRef.current.style.transform = '';
                magneticRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                magneticRef.current = null;
            }
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseout', handleMouseOut);

        document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter as EventListener);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Re-attach on DOM changes
        const observer = new MutationObserver(() => {
            document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
                el.removeEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('mouseenter', handleMouseEnter as EventListener);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseout', handleMouseOut);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    // Hide on mobile
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        width: isHovering ? 80 : 12,
                        height: isHovering ? 80 : 12,
                        scale: isClicking ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Dot / Circle */}
                    <motion.div
                        className="rounded-full bg-white"
                        animate={{
                            width: isHovering ? 80 : 12,
                            height: isHovering ? 80 : 12,
                        }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Text inside */}
                    {isHovering && cursorText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute text-black text-xs font-semibold uppercase tracking-wider"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible && !isHovering ? 0.5 : 0,
                }}
            >
                <motion.div
                    className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
                    animate={{
                        scale: isClicking ? 0.8 : 1,
                    }}
                />
            </motion.div>

            {/* Hide default cursor */}
            <style jsx global>{`
                @media (hover: hover) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>
        </>
    );
}

export default CustomCursor;

/**
 * ============================================
 * HOOK: useScrollAnimation
 * ============================================
 * 
 * Hook para detectar quando elemento entra na viewport
 * Usa Intersection Observer para performance
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
    /** Margem de trigger (-100px = dispara 100px antes de aparecer) */
    threshold?: number;
    /** Dispara apenas uma vez */
    once?: boolean;
    /** Root margin para ajuste fino */
    rootMargin?: string;
}

/**
 * Detecta quando um elemento entra na viewport
 * @param options Configurações do observer
 * @returns [ref, isInView] - Ref para anexar ao elemento e boolean de visibilidade
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollAnimationOptions = {}
) {
    const { threshold = 0.1, once = true, rootMargin = '0px' } = options;
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    // Desconecta se for disparar apenas uma vez
                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, once, rootMargin]);

    return [ref, isInView] as const;
}

export default useScrollAnimation;

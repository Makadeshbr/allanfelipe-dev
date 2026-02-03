/**
 * ============================================
 * COMPONENT: SmoothScroll Provider
 * ============================================
 * 
 * Scroll nativo - sem bibliotecas
 * Velocidade normal e responsiva
 */

'use client';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    // Scroll 100% nativo - sem Lenis, sem delays
    return <>{children}</>;
}

export default SmoothScrollProvider;

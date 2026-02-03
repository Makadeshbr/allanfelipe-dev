/**
 * ============================================
 * HOOK: useCountUp
 * ============================================
 * 
 * Hook para animar números contando de 0 até o valor final
 * Perfeito para métricas/stats
 */

'use client';

import { useEffect, useState } from 'react';

interface UseCountUpOptions {
    /** Valor inicial (padrão: 0) */
    start?: number;
    /** Valor final */
    end: number;
    /** Duração da animação em ms (padrão: 2000) */
    duration?: number;
    /** Inicia automaticamente ou aguarda trigger */
    startOnMount?: boolean;
}

/**
 * Anima um número de um valor inicial até o final
 * @param options Configurações da animação
 * @returns [currentValue, startCounting] - Valor atual e função para iniciar
 */
export function useCountUp(options: UseCountUpOptions) {
    const { start = 0, end, duration = 2000, startOnMount = false } = options;
    const [count, setCount] = useState(startOnMount ? start : end);
    const [isStarted, setIsStarted] = useState(startOnMount);

    /**
     * Inicia a contagem
     */
    const startCounting = () => {
        if (!isStarted) {
            setCount(start);
            setIsStarted(true);
        }
    };

    useEffect(() => {
        if (!isStarted) return;

        // Calcula incrementos baseado na duração
        const incrementTime = 16; // ~60fps
        const totalIncrements = duration / incrementTime;
        const incrementValue = (end - start) / totalIncrements;

        let currentValue = start;
        const timer = setInterval(() => {
            currentValue += incrementValue;

            if (
                (incrementValue > 0 && currentValue >= end) ||
                (incrementValue < 0 && currentValue <= end)
            ) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.round(currentValue));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [isStarted, start, end, duration]);

    return [count, startCounting] as const;
}

export default useCountUp;

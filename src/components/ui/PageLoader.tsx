/**
 * ============================================
 * COMPONENT: Page Loader
 * ============================================
 * 
 * Loading screen na primeira visita
 * Estilo 1minus1.com
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if this is the first visit
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        sessionStorage.setItem('hasVisited', 'true');
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <span className="font-display text-3xl font-bold text-gradient">
                            Allan Felipe
                        </span>
                        <span className="font-display text-3xl font-bold text-[var(--text-muted)]">
                            .dev
                        </span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--accent-primary)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    {/* Percentage */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-[var(--text-muted)] text-sm font-mono"
                    >
                        {Math.floor(Math.min(progress, 100))}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PageLoader;

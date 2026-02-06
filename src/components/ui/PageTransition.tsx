'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Phase = 'idle' | 'cover' | 'reveal';

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [phase, setPhase] = useState<Phase>('idle');
    const [displayChildren, setDisplayChildren] = useState(children);
    const prevPathRef = useRef(pathname);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    // Detect route change
    useEffect(() => {
        if (pathname !== prevPathRef.current) {
            // Start cover phase
            setPhase('cover');

            // After cover animation completes, swap content and start reveal
            timerRef.current = setTimeout(() => {
                setDisplayChildren(children);
                prevPathRef.current = pathname;
                window.scrollTo(0, 0);
                setPhase('reveal');

                // After reveal animation completes, go back to idle
                timerRef.current = setTimeout(() => {
                    setPhase('idle');
                }, 750);
            }, 750);
        } else {
            // Same path - just update children (e.g. initial render)
            setDisplayChildren(children);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [pathname, children]);

    return (
        <div className="relative">
            {/* Swipe Overlay */}
            {phase !== 'idle' && (
                <motion.div
                    className="fixed inset-0 z-[500] bg-[var(--accent-primary)]"
                    initial={{
                        scaleY: phase === 'cover' ? 0 : 1,
                    }}
                    animate={{
                        scaleY: phase === 'cover' ? 1 : 0,
                    }}
                    style={{
                        transformOrigin: phase === 'cover' ? 'bottom' : 'top',
                    }}
                    transition={{
                        duration: 0.75,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                />
            )}

            {/* Page Content */}
            <motion.div
                key={prevPathRef.current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
                {displayChildren}
            </motion.div>
        </div>
    );
}

export default PageTransition;

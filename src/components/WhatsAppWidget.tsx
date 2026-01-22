'use client';

import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function WhatsAppWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show widget after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        // Show tooltip after 8 seconds
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
            // Hide tooltip after 5 seconds
            setTimeout(() => setShowTooltip(false), 5000);
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    const phoneNumber = '5514991618312';
    const message = encodeURIComponent('Olá! Vim pelo site e gostaria de conversar sobre um projeto.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                                className="bg-white px-4 py-2 rounded-lg shadow-lg border border-black/5 max-w-[200px]"
                            >
                                <p className="text-sm text-[#1A1A1A] font-medium">
                                    Precisa de ajuda? 👋
                                </p>
                                <p className="text-xs text-[#6B6B6B]">
                                    Respondo em minutos!
                                </p>
                                {/* Arrow */}
                                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-black/5 rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* WhatsApp Button */}
                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        aria-label="Conversar pelo WhatsApp"
                    >
                        <MessageCircle className="w-7 h-7 text-white" />

                        {/* Pulse animation */}
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
                    </motion.a>
                </div>
            )}
        </AnimatePresence>
    );
}

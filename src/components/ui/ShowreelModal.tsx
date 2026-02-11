/**
 * ============================================
 * COMPONENT: Showreel Modal - Enhanced
 * ============================================
 * 
 * Modal fullscreen para vídeo showreel
 * Com vídeo real e controles
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ShowreelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Auto-play when opened
    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    }, [isOpen]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(prog);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
                    onClick={onClose}
                >
                    {/* Close button */}
                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-6 right-6 z-10 flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                        onClick={onClose}
                    >
                        <span className="text-sm">Close</span>
                        <X size={24} />
                    </motion.button>

                    {/* Video container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-6xl aspect-video mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Video - Using placeholder video for demo */}
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover rounded-lg"
                            muted={isMuted}
                            loop
                            playsInline
                            onTimeUpdate={handleTimeUpdate}
                            poster="/video-poster.jpg"
                        >
                            {/* Using a public sample video */}
                            <source
                                src="/videos/PromoVideoBarberSite.mp4"
                                type="video/mp4"
                            />
                            Seu navegador não suporta o elemento de vídeo.
                        </video>

                        {/* Play/Pause overlay */}
                        <div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            onClick={togglePlay}
                        >
                            <AnimatePresence>
                                {!isPlaying && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="w-20 h-20 bg-[var(--accent-primary)] rounded-full flex items-center justify-center"
                                    >
                                        <Play size={32} className="text-[var(--bg-primary)] ml-1" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            {/* Progress bar */}
                            <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer">
                                <div
                                    className="h-full bg-[var(--accent-primary)] rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Control buttons */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={togglePlay}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause size={20} className="text-white" />
                                    ) : (
                                        <Play size={20} className="text-white" />
                                    )}
                                </button>

                                <button
                                    onClick={toggleMute}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {isMuted ? (
                                        <VolumeX size={20} className="text-white" />
                                    ) : (
                                        <Volume2 size={20} className="text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-8 left-8"
                    >
                        <p className="text-white/50 text-sm uppercase tracking-widest mb-1">
                            Showreel 2024
                        </p>
                        <h2 className="font-display text-2xl font-bold text-white">
                            Allan Felipe — Portfolio
                        </h2>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ShowreelModal;

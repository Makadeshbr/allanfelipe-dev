/**
 * ============================================
 * COMPONENT: ContactModal - Estilo 1minus1.com
 * ============================================
 * 
 * Modal fullscreen com animação circular
 * Abre ao clicar em "Contact" no header
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contactInfo } from '@/data/site-data';
import { useLanguage } from '@/context/LanguageContext';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const contentRef = useRef<HTMLDivElement>(null);

    // Animar conteúdo ao abrir
    useEffect(() => {
        if (isOpen && contentRef.current) {
            const elements = contentRef.current.querySelectorAll('.reveal-item');
            gsap.fromTo(
                elements,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power4.out',
                    delay: 0.4,
                }
            );
        }
    }, [isOpen]);

    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('contact.form.errors.nameRequired') as string || 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contact.form.errors.emailRequired') as string || 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('contact.form.errors.emailInvalid') as string || 'Invalid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contact.form.errors.messageRequired') as string || 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xbdglnzb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setFormData({ name: '', email: '', message: '' });
                    setSubmitStatus('idle');
                    onClose();
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ clipPath: 'circle(0% at calc(100% - 100px) 40px)' }}
                    animate={{ clipPath: 'circle(150% at calc(100% - 100px) 40px)' }}
                    exit={{ clipPath: 'circle(0% at calc(100% - 100px) 40px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[300] bg-[var(--bg-primary)]"
                >
                    {/* Close Button - Estilo 1minus1 */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        onClick={onClose}
                        className="absolute top-8 right-8 z-[310] w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all group"
                        aria-label="Fechar"
                    >
                        <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                    </motion.button>

                    {/* Content */}
                    <div ref={contentRef} className="container h-full flex items-center py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
                            {/* Left - Info */}
                            <div className="flex flex-col justify-center">
                                <h2 className="reveal-item font-display text-[clamp(2rem,5vw,4rem)] font-bold mb-6">
                                    {t('contactModal.title') as string || 'Hi. Nice to meet you.'}
                                </h2>

                                <p className="reveal-item text-[var(--text-secondary)] text-lg mb-10 max-w-md">
                                    {t('contactModal.subtitle') as string || 'Clients worldwide: Brazil, USA, Europe + more.'}
                                </p>

                                <div className="reveal-item space-y-4">
                                    <div>
                                        <p className="text-[var(--text-muted)] text-sm mb-1">
                                            {t('contactModal.location') as string || 'Location'}
                                        </p>
                                        <p className="text-[var(--text-primary)] font-medium">
                                            {contactInfo.location}
                                        </p>
                                    </div>

                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="block text-[var(--accent-primary)] text-lg hover:underline underline-offset-4"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>

                                {/* Social Links */}
                                <div className="reveal-item flex gap-6 mt-10">
                                    {contactInfo.socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                                        >
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Form */}
                            <div className="flex items-center">
                                {submitStatus === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center w-full"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[var(--accent-primary)]/10 rounded-full">
                                            <CheckCircle2 className="w-8 h-8 text-[var(--accent-primary)]" />
                                        </div>
                                        <h3 className="font-display text-2xl font-bold mb-4">
                                            {t('contact.success.title') as string || 'Message sent!'}
                                        </h3>
                                        <p className="text-[var(--text-secondary)]">
                                            {t('contact.success.message') as string || "I'll get back to you soon."}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="reveal-item w-full space-y-6">
                                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-4">
                                            {t('contactModal.formTitle') as string || 'Send a message'}
                                        </p>

                                        {/* Name */}
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t('contact.form.placeholders.name') as string || 'Your name'}
                                                className={`w-full bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-white/20'} py-4 text-lg text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors`}
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                                    <AlertCircle size={14} /> {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t('contact.form.placeholders.email') as string || 'Your email'}
                                                className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-white/20'} py-4 text-lg text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors`}
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                                    <AlertCircle size={14} /> {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={3}
                                                placeholder={t('contact.form.placeholders.message') as string || 'Your message'}
                                                className={`w-full bg-transparent border-b-2 ${errors.message ? 'border-red-500' : 'border-white/20'} py-4 text-lg text-white placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-none`}
                                            />
                                            {errors.message && (
                                                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                                    <AlertCircle size={14} /> {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex items-center gap-3 text-[var(--accent-primary)] text-lg font-medium hover:gap-5 transition-all disabled:opacity-50"
                                            whileHover={{ x: 5 }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    {t('contact.form.sending') as string || 'Sending...'}
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    {t('contact.form.submit') as string || 'Send message'}
                                                </>
                                            )}
                                        </motion.button>

                                        {submitStatus === 'error' && (
                                            <p className="text-red-400 text-sm">
                                                {t('contact.error') as string || 'Something went wrong. Please try again.'}
                                            </p>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ContactModal;

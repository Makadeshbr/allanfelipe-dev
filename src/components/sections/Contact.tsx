/**
 * ============================================
 * COMPONENT: Contact Section - Formspree Real
 * ============================================
 * 
 * Formulário funcional igual ao site original
 * Sem botão verde do WhatsApp - integrado no design
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Clock, Loader2 } from 'lucide-react';
import { contactInfo } from '@/data/site-data';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
    name: string;
    email: string;
    service: string;
    budget: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

// Opções mapeadas para chaves de tradução
const budgetOptions = ['1k-3k', '3k-5k', '5k-10k', '10k+', 'nao-sei'];
const serviceOptions = ['landing', 'site', 'app', 'automacao', 'outro'];

export function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = sectionRef.current?.querySelectorAll('.reveal-line');
            lines?.forEach((line, i) => {
                gsap.fromTo(
                    line,
                    { y: '100%' },
                    {
                        y: '0%',
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                        },
                        delay: i * 0.1,
                    }
                );
            });

            if (formRef.current) {
                const fields = formRef.current.querySelectorAll('.form-field');
                gsap.fromTo(
                    fields,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('contact.form.errors.nameRequired') as string;
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contact.form.errors.emailRequired') as string;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('contact.form.errors.emailInvalid') as string;
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contact.form.errors.messageRequired') as string;
        } else if (formData.message.length < 10) {
            newErrors.message = t('contact.form.errors.messageTooShort') as string;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Formspree - igual ao site original
            const response = await fetch('https://formspree.io/f/xbdglnzb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    service: formData.service,
                    budget: formData.budget,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setFormData({ name: '', email: '', service: '', budget: '', message: '' });
                    setSubmitStatus('idle');
                }, 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="section bg-[var(--bg-primary)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left side - Text */}
                    <div>
                        <div className="overflow-hidden mb-4">
                            <p className="reveal-line text-[var(--accent-primary)] text-sm uppercase tracking-[0.5em] font-medium">
                                {t('contact.subtitle') as string}
                            </p>
                        </div>

                        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold mb-6">
                            <div className="overflow-hidden">
                                <span className="reveal-line block">{t('contact.title.line1') as string}</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="reveal-line block text-gradient">{t('contact.title.line2') as string}</span>
                            </div>
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-[var(--text-secondary)] text-lg mb-10 max-w-md"
                        >
                            {t('contact.description') as string}
                        </motion.p>

                        {/* Contact info - Estilo limpo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-6"
                        >
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-white/5 flex items-center justify-center group-hover:border-[var(--accent-primary)]/30 transition-colors">
                                    <Mail size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">{t('contact.info.email') as string}</p>
                                    <p className="text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">{contactInfo.email}</p>
                                </div>
                            </a>

                            <a
                                href={`https://wa.me/${contactInfo.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-white/5 flex items-center justify-center group-hover:border-[var(--accent-primary)]/30 transition-colors">
                                    <Send size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">{t('contact.info.whatsapp') as string}</p>
                                    <p className="text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">{contactInfo.phone}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-white/5 flex items-center justify-center">
                                    <MapPin size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">{t('contact.info.location') as string}</p>
                                    <p className="text-[var(--text-primary)]">{contactInfo.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-white/5 flex items-center justify-center">
                                    <Clock size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">{t('contact.info.responseTime') as string}</p>
                                    <p className="text-[var(--text-primary)]">{t('contact.info.responseValue') as string}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side - Form */}
                    <div>
                        {submitStatus === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[var(--bg-card)] rounded-2xl p-12 text-center border border-white/5"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[var(--accent-primary)]/10 rounded-full">
                                    <CheckCircle2 className="w-8 h-8 text-[var(--accent-primary)]" />
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-4">{t('contact.success.title') as string}</h3>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    {t('contact.success.message') as string}
                                </p>
                                <button
                                    onClick={() => setSubmitStatus('idle')}
                                    className="text-[var(--accent-primary)] hover:underline"
                                >
                                    {t('contact.success.button') as string}
                                </button>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email */}
                                <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            {t('contact.form.name') as string} *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full bg-[var(--bg-card)] border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors`}
                                            placeholder={t('contact.form.placeholders.name') as string}
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                                <AlertCircle size={14} /> {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            {t('contact.form.email') as string} *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full bg-[var(--bg-card)] border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors`}
                                            placeholder={t('contact.form.placeholders.email') as string}
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                                <AlertCircle size={14} /> {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Service & Budget */}
                                <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="service" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            {t('contact.form.service') as string}
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-card)] border border-white/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">{t('contact.form.placeholders.select') as string}</option>
                                            {serviceOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {t(`contact.form.options.services.${opt}`) as string}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="budget" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            {t('contact.form.budget') as string}
                                        </label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-card)] border border-white/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">{t('contact.form.placeholders.select') as string}</option>
                                            {budgetOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {t(`contact.form.options.budget.${opt}`) as string}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="form-field">
                                    <label htmlFor="message" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                        {t('contact.form.message') as string} *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full bg-[var(--bg-card)] border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-none`}
                                        placeholder={t('contact.form.placeholders.message') as string}
                                    />
                                    {errors.message && (
                                        <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                            <AlertCircle size={14} /> {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="form-field">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent-primary)] text-white font-medium rounded-lg hover:bg-[var(--accent-secondary)] disabled:opacity-70 transition-all"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                {t('contact.form.sending') as string}
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                {t('contact.form.submit') as string}
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                                {submitStatus === 'error' && (
                                    <p className="text-center text-red-400 text-sm">
                                        {t('contact.error') as string}
                                    </p>
                                )}

                                <p className="text-[var(--text-muted)] text-xs text-center">
                                    {t('contact.disclaimer') as string}
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;

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

const budgetOptions = [
    { value: '1k-3k', label: 'R$ 1.000 - R$ 3.000' },
    { value: '3k-5k', label: 'R$ 3.000 - R$ 5.000' },
    { value: '5k-10k', label: 'R$ 5.000 - R$ 10.000' },
    { value: '10k+', label: 'Acima de R$ 10.000' },
    { value: 'nao-sei', label: 'Não sei ainda' },
];

const serviceOptions = [
    { value: 'landing', label: 'Landing Page' },
    { value: 'site', label: 'Site / Sistema Web' },
    { value: 'app', label: 'Aplicativo Mobile' },
    { value: 'automacao', label: 'Automação' },
    { value: 'outro', label: 'Outro' },
];

export function Contact() {
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
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Mensagem é obrigatória';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Mensagem muito curta';
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
                                Contato
                            </p>
                        </div>

                        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold mb-6">
                            <div className="overflow-hidden">
                                <span className="reveal-line block">Vamos construir algo</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="reveal-line block text-gradient">incrível juntos?</span>
                            </div>
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-[var(--text-secondary)] text-lg mb-10 max-w-md"
                        >
                            Tem um projeto em mente? Me conta sua ideia e vamos transformá-la em realidade.
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
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Email</p>
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
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">WhatsApp</p>
                                    <p className="text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">{contactInfo.phone}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-white/5 flex items-center justify-center">
                                    <MapPin size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Localização</p>
                                    <p className="text-[var(--text-primary)]">{contactInfo.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-white/5 flex items-center justify-center">
                                    <Clock size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Tempo de resposta</p>
                                    <p className="text-[var(--text-primary)]">Até 24 horas</p>
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
                                <h3 className="font-display text-2xl font-bold mb-4">Mensagem enviada!</h3>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Obrigado pelo contato. Vou analisar sua mensagem e retorno em breve.
                                </p>
                                <button
                                    onClick={() => setSubmitStatus('idle')}
                                    className="text-[var(--accent-primary)] hover:underline"
                                >
                                    Enviar outra mensagem
                                </button>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email */}
                                <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            Seu nome *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full bg-[var(--bg-card)] border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors`}
                                            placeholder="Como você se chama?"
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                                                <AlertCircle size={14} /> {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            Seu email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full bg-[var(--bg-card)] border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors`}
                                            placeholder="seu@email.com"
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
                                            Tipo de projeto
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-card)] border border-white/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">Selecione...</option>
                                            {serviceOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="budget" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                            Orçamento estimado
                                        </label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-card)] border border-white/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">Selecione...</option>
                                            {budgetOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="form-field">
                                    <label htmlFor="message" className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                        Conte sobre seu projeto *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full bg-[var(--bg-card)] border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-none`}
                                        placeholder="Descreva sua ideia, objetivos e prazo desejado..."
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
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Enviar Mensagem
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                                {submitStatus === 'error' && (
                                    <p className="text-center text-red-400 text-sm">
                                        Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
                                    </p>
                                )}

                                <p className="text-[var(--text-muted)] text-xs text-center">
                                    Respondo em até 24 horas úteis
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

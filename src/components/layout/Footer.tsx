/**
 * ============================================
 * COMPONENT: Footer - Com Dados Reais
 * ============================================
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { contactInfo, navLinks } from '@/data/site-data';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.footer-reveal',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer ref={sectionRef} className="bg-[var(--bg-secondary)] pt-24 pb-8 border-t border-white/5">
            <div className="container">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    {/* CTA */}
                    <div className="footer-reveal lg:col-span-6">
                        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold mb-6">
                            Diferente onde importa.{' '}
                            <span className="text-gradient">Fanático onde conta.</span>
                        </h2>

                        <a
                            href={`https://wa.me/${contactInfo.whatsapp}?text=Olá! Vim pelo site e gostaria de conversar sobre um projeto.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[var(--accent-primary)] text-xl font-medium hover:gap-4 transition-all group"
                        >
                            Fale comigo
                            <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    {/* Location Card */}
                    <div className="footer-reveal lg:col-span-3">
                        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-white/5">
                            <MapPin size={24} className="text-[var(--accent-primary)] mb-4" />
                            <h3 className="font-display text-lg font-bold mb-2">
                                {contactInfo.location}
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm">
                                Atendimento 100% remoto<br />
                                para todo o Brasil
                            </p>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-reveal lg:col-span-3 space-y-4">
                        <a
                            href={`mailto:${contactInfo.email}`}
                            className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                        >
                            <Mail size={18} />
                            <span>{contactInfo.email}</span>
                        </a>

                        <a
                            href={`https://wa.me/${contactInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                        >
                            <MessageSquare size={18} />
                            <span>{contactInfo.phone}</span>
                        </a>
                    </div>
                </div>

                {/* Middle Section - Links */}
                <div className="footer-reveal grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-8 border-y border-white/5">
                    {/* Navigation */}
                    <div>
                        <h4 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">
                            Navegação
                        </h4>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">
                            Serviços
                        </h4>
                        <ul className="space-y-2">
                            {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Backend APIs'].map((service) => (
                                <li key={service}>
                                    <Link
                                        href="/services"
                                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">
                            Social
                        </h4>
                        <ul className="space-y-2">
                            {contactInfo.socials.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                                    >
                                        <social.icon size={16} />
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/legal/terms" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/privacy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Privacidade
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-reveal flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="font-display text-xl font-bold">
                        <span className="text-gradient">Allan Felipe</span>
                        <span className="text-[var(--text-muted)]">.dev</span>
                    </Link>

                    {/* Copyright */}
                    <p className="text-[var(--text-muted)] text-sm">
                        © {currentYear} Allan Felipe. Todos os direitos reservados.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        {contactInfo.socials.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

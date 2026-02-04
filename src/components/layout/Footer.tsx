/**
 * ============================================
 * COMPONENT: Footer - Estilo 1minus1.com
 * ============================================
 * 
 * Footer minimalista em linha única
 */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { contactInfo, navLinks } from '@/data/site-data';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.footer-reveal',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 95%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer ref={sectionRef} className="bg-[var(--bg-secondary)] py-8 border-t border-white/5">
            <div className="container">
                {/* CTA Section - Estilo 1minus1 */}
                <div className="footer-reveal text-center mb-16">
                    <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold mb-4">
                        {t('footer.cta.line1') as string || 'Different where it matters.'}{' '}
                        <span className="text-gradient">
                            {t('footer.cta.line2') as string || 'Fanatical where it counts.'}
                        </span>
                    </h2>
                    <motion.button
                        className="text-[var(--accent-primary)] text-lg font-medium hover:underline underline-offset-4"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                            const event = new CustomEvent('openContactModal');
                            window.dispatchEvent(event);
                        }}
                    >
                        {t('footer.contactUs') as string || 'Contact us'}
                    </motion.button>
                </div>

                {/* Info Row - Estilo 1minus1: Location + Email */}
                <div className="footer-reveal flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-white/5">
                    <div className="text-center md:text-left">
                        <p className="text-[var(--text-muted)] text-sm mb-1">
                            {t('footer.location') as string || 'Based in Brazil'}
                        </p>
                        <p className="text-[var(--text-secondary)] text-sm">
                            {contactInfo.location}
                        </p>
                    </div>
                    <div className="text-center md:text-right">
                        <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                        >
                            {contactInfo.email}
                        </a>
                    </div>
                </div>

                {/* Bottom Row - Nav + Legal + Socials */}
                <div className="footer-reveal grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Legal */}
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                        <Link
                            href="/legal/terms"
                            className="text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors"
                        >
                            {t('footer.terms') as string || 'Terms'}
                        </Link>
                        <Link
                            href="/legal/privacy"
                            className="text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors"
                        >
                            {t('footer.privacy') as string || 'Privacy'}
                        </Link>
                    </div>

                    {/* Social Links - Center */}
                    <div className="flex items-center justify-center gap-6">
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

                    {/* Nav Links - Right */}
                    <div className="flex items-center gap-4 justify-center md:justify-end flex-wrap">
                        {navLinks.slice(0, 4).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Copyright - Single line */}
                <div className="footer-reveal flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                    <Link href="/" className="font-display text-lg font-bold">
                        <span className="text-gradient">Allan Felipe</span>
                        <span className="text-[var(--text-muted)]">.dev</span>
                    </Link>

                    <p className="text-[var(--text-muted)] text-xs">
                        © {currentYear} Allan Felipe. {t('footer.rights') as string || 'All rights reserved.'}
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        {contactInfo.socials.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
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

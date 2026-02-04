/**
 * ============================================
 * COMPONENT: Header - Estilo 1minus1.com
 * ============================================
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { navLinks, contactInfo } from '@/data/site-data';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
    onContactClick?: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Usando o contexto de linguagem
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen && menuRef.current) {
            const links = menuRef.current.querySelectorAll('.menu-link');
            gsap.fromTo(
                links,
                { y: 100, opacity: 0, rotateX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power4.out',
                    delay: 0.3,
                }
            );

            const footer = menuRef.current.querySelector('.menu-footer');
            gsap.fromTo(
                footer,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out', delay: 0.8 }
            );
        }
    }, [isMenuOpen]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Função para traduzir labels dos links
    const getTranslatedLabel = (key: string) => {
        return t(`nav.${key}`) as string || key;
    };

    // Mapeamento de links para chaves de tradução
    const linkKeys: Record<string, string> = {
        '/about': 'about',
        '/services': 'services',
        '/projects': 'projects',
        '/case-studies': 'caseStudies',
        '/contact': 'contact'
    };

    return (
        <>
            {/* Header Bar */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${isScrolled && !isMenuOpen
                    ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-white/5'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="relative z-[250]">
                        <motion.div
                            className="font-display text-xl font-bold"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className={isMenuOpen ? 'text-white' : 'text-gradient'}>
                                Allan Felipe
                            </span>
                            <span className={isMenuOpen ? 'text-white/50' : 'text-[var(--text-muted)]'}>
                                .dev
                            </span>
                        </motion.div>
                    </Link>

                    {/* Actions: Contact + Language + Menu */}
                    <div className="flex items-center gap-8">
                        {/* Contact Button - Estilo 1minus1 */}
                        <motion.button
                            className={`hidden md:block relative z-[250] text-sm font-medium transition-colors ${isMenuOpen
                                ? 'text-white/60 hover:text-white'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                            onClick={() => {
                                if (onContactClick) {
                                    onContactClick();
                                } else {
                                    const event = new CustomEvent('openContactModal');
                                    window.dispatchEvent(event);
                                }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t('nav.contact') as string || 'Contact'}
                        </motion.button>

                        {/* Language Toggle */}
                        <motion.button
                            className={`relative z-[250] flex items-center gap-1 text-sm font-medium transition-colors ${isMenuOpen
                                ? 'text-white/60 hover:text-white'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                            onClick={toggleLanguage}
                            whileTap={{ scale: 0.95 }}
                            title={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
                        >
                            <span className={language === 'pt-BR' ? (isMenuOpen ? 'text-white' : 'text-[var(--text-primary)]') : ''}>
                                PT
                            </span>
                            <span className="opacity-40">|</span>
                            <span className={language === 'en' ? (isMenuOpen ? 'text-white' : 'text-[var(--text-primary)]') : ''}>
                                EN
                            </span>
                        </motion.button>

                        {/* Menu Button */}
                        <motion.button
                            className="relative z-[250] flex items-center gap-3 group"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`text-sm font-medium transition-colors ${isMenuOpen ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                                }`}>
                                {isMenuOpen ? (t('header.close') as string || 'Close') : (t('header.menu') as string || 'Menu')}
                            </span>
                            <div className="relative w-6 h-4 flex flex-col justify-between">
                                <motion.span
                                    className={`w-full h-0.5 rounded-full transition-colors ${isMenuOpen ? 'bg-white' : 'bg-[var(--text-primary)]'
                                        }`}
                                    animate={{
                                        rotate: isMenuOpen ? 45 : 0,
                                        y: isMenuOpen ? 7 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.span
                                    className={`w-full h-0.5 rounded-full transition-colors ${isMenuOpen ? 'bg-white' : 'bg-[var(--text-primary)]'
                                        }`}
                                    animate={{
                                        rotate: isMenuOpen ? -45 : 0,
                                        y: isMenuOpen ? -7 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Fullscreen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 60px) 40px)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[190] bg-[var(--accent-primary)]"
                    >
                        <div className="container h-full flex flex-col justify-center pt-20">
                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <div key={link.href} className="overflow-hidden">
                                        <Link
                                            href={link.href}
                                            onClick={handleLinkClick}
                                            className="menu-link block group"
                                        >
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-white/30 text-lg font-medium">
                                                    0{index + 1}
                                                </span>
                                                <motion.span
                                                    className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-none"
                                                    whileHover={{ x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {linkKeys[link.href] ? getTranslatedLabel(linkKeys[link.href]) : link.label}
                                                </motion.span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}

                                {/* Contact - Abre modal em vez de navegar */}
                                <div className="overflow-hidden">
                                    <button
                                        onClick={() => {
                                            handleLinkClick();
                                            setTimeout(() => {
                                                const event = new CustomEvent('openContactModal');
                                                window.dispatchEvent(event);
                                            }, 400);
                                        }}
                                        className="menu-link block group text-left"
                                    >
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-white/30 text-lg font-medium">
                                                0{navLinks.length + 1}
                                            </span>
                                            <motion.span
                                                className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-none"
                                                whileHover={{ x: 20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {t('nav.contact') as string || 'Contact'}
                                            </motion.span>
                                        </div>
                                    </button>
                                </div>
                            </nav>

                            {/* Menu Footer - Com dados reais */}
                            <div className="menu-footer mt-auto pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0">
                                <div>
                                    <p className="text-white/60 text-sm mb-2">{t('header.email') as string || 'Email'}</p>
                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="text-white text-lg hover:underline"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>

                                <div className="flex gap-6">
                                    {contactInfo.socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
                                        >
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Header;

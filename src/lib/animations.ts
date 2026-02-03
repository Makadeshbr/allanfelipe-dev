/**
 * ============================================
 * LIB: Animation Variants - ENHANCED
 * ============================================
 * 
 * Variantes de animação mais fiéis ao 1minus1.com
 * Inclui: parallax, clip-path reveals, smooth easing
 */

import { Variants, Transition } from 'framer-motion';

/** Easing suave estilo 1minus1 */
const smoothEase: Transition['ease'] = [0.6, 0.01, 0.05, 0.95];
const dramaticEase: Transition['ease'] = [0.16, 1, 0.3, 1];
const bounceEase: Transition['ease'] = [0.34, 1.56, 0.64, 1];

/** Fade in com slide up mais dramático */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 80,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: dramaticEase,
        },
    },
};

/** Fade in mais suave (para textos secundários) */
export const fadeInUpSoft: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: smoothEase,
        },
    },
};

/** Reveal com clip-path (estilo 1minus1 text reveal) */
export const clipReveal: Variants = {
    hidden: {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
    },
    visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: dramaticEase,
        },
    },
};

/** Reveal de texto linha por linha */
export const lineReveal: Variants = {
    hidden: {
        y: '110%',
        rotateX: -80,
        opacity: 0,
    },
    visible: {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        transition: {
            duration: 0.9,
            ease: dramaticEase,
        },
    },
};

/** Fade in da esquerda com mais movimento */
export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: dramaticEase,
        },
    },
};

/** Fade in da direita com mais movimento */
export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: dramaticEase,
        },
    },
};

/** Scale in suave */
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: smoothEase,
        },
    },
};

/** Scale in com overshoot (bounce) */
export const scaleInBounce: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: bounceEase,
        },
    },
};

/** Container stagger - mais espaçado */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

/** Container stagger rápido */
export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

/** Container stagger lento (para hero) */
export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

/** Hover para cards - lift mais pronunciado */
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        boxShadow: '0 0 0 rgba(0, 255, 136, 0)',
    },
    hover: {
        scale: 1.03,
        y: -12,
        boxShadow: '0 25px 50px rgba(0, 255, 136, 0.15)',
        transition: {
            duration: 0.4,
            ease: smoothEase,
        },
    },
};

/** Hover para imagens (zoom mais suave) */
export const imageZoom = {
    rest: {
        scale: 1,
        filter: 'brightness(1)',
    },
    hover: {
        scale: 1.15,
        filter: 'brightness(1.1)',
        transition: {
            duration: 0.6,
            ease: smoothEase,
        },
    },
};

/** Hover para links (underline expand) */
export const linkHover = {
    rest: {
        width: '0%',
    },
    hover: {
        width: '100%',
        transition: {
            duration: 0.3,
            ease: smoothEase,
        },
    },
};

/** Parallax effect (para background) */
export const parallaxY = (strength: number = 100): Variants => ({
    hidden: { y: 0 },
    visible: { y: 0 },
});

/** Floating animation (para elementos decorativos) */
export const float: Variants = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
        },
    },
};

/** Rotate suave infinito */
export const rotateSlow: Variants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
        },
    },
};

/** Pulse glow (para CTAs) */
export const pulseGlow: Variants = {
    animate: {
        boxShadow: [
            '0 0 20px rgba(0, 255, 136, 0.2)',
            '0 0 60px rgba(0, 255, 136, 0.4)',
            '0 0 20px rgba(0, 255, 136, 0.2)',
        ],
        transition: {
            duration: 2.5,
            ease: 'easeInOut',
            repeat: Infinity,
        },
    },
};

/** Blur in (para overlays) */
export const blurIn: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: smoothEase,
        },
    },
};

/** Mask reveal (tipo cortina) */
export const maskReveal: Variants = {
    hidden: {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    },
    visible: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: {
            duration: 1.2,
            ease: dramaticEase,
        },
    },
};

/** Typewriter character animation */
export const typewriterChar: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
};

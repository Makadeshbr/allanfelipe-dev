/**
 * ============================================
 * TYPES - Tipos globais da aplicação
 * ============================================
 */

/** Dados de um projeto/case study */
export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    images?: string[];
    tags: string[];
    category: 'web' | 'mobile' | 'fullstack' | 'landing';
    link?: string;
    liveUrl?: string; // Alias ou específico para live demo
    github?: string;
    githubUrl?: string; // Alias ou específico para repo
    featured: boolean;
    gradient?: string; // Para fallback de imagem
}

/** Dados de um serviço oferecido */
export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    items: string[];
}

/** Dados de uma métrica/stat */
export interface Stat {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
}

/** Link de navegação */
export interface NavLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

/** Dados de contato */
export interface ContactInfo {
    email: string;
    phone?: string;
    location: string;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
}

/** Props comuns para animações */
export interface AnimationProps {
    delay?: number;
    duration?: number;
    once?: boolean;
}

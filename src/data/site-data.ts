/**
 * ============================================
 * SITE DATA - Allan Felipe Dev (Dados Reais)
 * ============================================
 */

import { NavLink, Service, Stat, Project } from '@/types';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

/** Links de navegação */
export const navLinks: NavLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact', href: '/#contact' },
];

/** Métricas/Stats */
export const stats: Stat[] = [
    { value: 2, suffix: '+', label: 'Anos de Experiência' },
    { value: 12, suffix: '+', label: 'Projetos Entregues' },
    { value: 100, suffix: '%', label: 'Clientes Satisfeitos' },
    { value: 24, suffix: '/7', label: 'Suporte Dedicado' },
];

/** Serviços oferecidos */
export const services: Service[] = [
    {
        id: 'web',
        icon: 'Globe',
        title: 'Desenvolvimento Web',
        description: 'Aplicações web modernas e de alta performance',
        items: ['Landing Pages', 'Web Apps (SPA/SSR)', 'E-commerce', 'Dashboards'],
    },
    {
        id: 'mobile',
        icon: 'Smartphone',
        title: 'Apps Mobile',
        description: 'Aplicativos nativos e cross-platform',
        items: ['React Native', 'iOS & Android', 'Apps Híbridos', 'PWAs'],
    },
    {
        id: 'backend',
        icon: 'Server',
        title: 'Backend & APIs',
        description: 'Infraestrutura robusta e escalável',
        items: ['Node.js & Express', 'REST & GraphQL', 'Microservices', 'Database Design'],
    },
    {
        id: 'fullstack',
        icon: 'Layers',
        title: 'Full-Stack',
        description: 'Soluções completas do frontend ao backend',
        items: ['Next.js & React', 'TypeScript', 'Cloud Deploy', 'DevOps'],
    },
];

/** Projetos/Portfolio */
export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'App de Gerenciamento',
        subtitle: 'Aplicativo mobile completo',
        description: 'Sistema completo de gerenciamento com React Native e Node.js. Interface moderna e performática.',
        image: '/projects/project-1.jpg',
        tags: ['React Native', 'Node.js', 'TypeScript'],
        category: 'mobile',
        featured: true,
    },
    {
        id: 'project-2',
        title: 'E-commerce Platform',
        subtitle: 'Loja virtual responsiva',
        description: 'Plataforma de e-commerce com Next.js, integração de pagamentos e painel administrativo.',
        image: '/projects/project-2.jpg',
        tags: ['Next.js', 'Stripe', 'Prisma'],
        category: 'fullstack',
        featured: true,
    },
    {
        id: 'project-3',
        title: 'Dashboard Analytics',
        subtitle: 'Painel de dados em tempo real',
        description: 'Dashboard interativo com gráficos, filtros e exportação de relatórios.',
        image: '/projects/project-3.jpg',
        tags: ['React', 'D3.js', 'WebSocket'],
        category: 'web',
        featured: true,
    },
    {
        id: 'project-4',
        title: 'Landing Page Premium',
        subtitle: 'Site institucional animado',
        description: 'Landing page de alta conversão com animações suaves e design premium.',
        image: '/projects/project-4.jpg',
        tags: ['Next.js', 'Framer Motion', 'Tailwind'],
        category: 'landing',
        featured: false,
    },
];

/** Informações de contato - DADOS REAIS */
export const contactInfo = {
    email: 'allanwesy17@gmail.com',
    phone: '+55 (14) 99161-8312',
    whatsapp: '5514991618312',
    location: 'Brasil - Atendimento Remoto',
    formspreeId: 'xbdglnzb',
    socials: [
        { name: 'GitHub', url: 'https://github.com/Makadeshbr', icon: Github },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/allanfelipefdev', icon: Linkedin },
        { name: 'WhatsApp', url: 'https://wa.me/5514991618312', icon: MessageSquare },
    ],
};

/** Palavras rotativas do hero */
export const heroRotatingWords = [
    'Web Apps',
    'Mobile Apps',
    'Landing Pages',
    'APIs REST',
    'Dashboards',
    'E-commerce',
];

/** Tech stack */
export const techStack = [
    'TypeScript',
    'JavaScript',
    'React',
    'React Native',
    'Next.js',
    'Node.js',
    'Express',
    'Prisma',
    'PostgreSQL',
    'MongoDB',
    'Tailwind CSS',
    'Framer Motion',
];

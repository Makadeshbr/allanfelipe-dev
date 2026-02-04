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
    { value: 5, suffix: '+', label: 'Anos de Experiência' },
    { value: 50, suffix: '+', label: 'Projetos Entregues' },
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
        id: 'app-gerenciamento',
        title: 'Management App',
        subtitle: 'Sistema de Gestão',
        description: 'Sistema completo de gestão de tarefas e equipes com foco em produtividade.',
        image: '/images/cases/mobile.png',
        tags: ['React Native', 'Node.js', 'TypeScript'],
        category: 'mobile',
        featured: true,
        gradient: 'from-blue-600/40 to-indigo-600/30'
    },
    {
        id: 'ecommerce-platform',
        title: 'Premium E-commerce',
        subtitle: 'Loja Virtual',
        description: 'Plataforma de vendas online com experiência de compra otimizada.',
        image: '/images/cases/ecommerce.png',
        tags: ['Next.js', 'Stripe', 'Prisma'],
        category: 'fullstack',
        featured: true,
        gradient: 'from-violet-600/40 to-purple-600/30'
    },
    {
        id: 'dashboard-analytics',
        title: 'Analytics Dashboard',
        subtitle: 'Data Visualization',
        description: 'Visualização de dados em tempo real para tomada de decisão estratégica.',
        image: '/images/cases/dashboard.png',
        tags: ['React', 'D3.js', 'WebSocket'],
        category: 'web',
        featured: true,
        gradient: 'from-cyan-600/40 to-blue-600/30'
    },
    {
        id: 'landing-premium',
        title: 'Corporate Website',
        subtitle: 'Site Institucional',
        description: 'Landing page de alta conversão para agência digital.',
        image: '/images/cases/landing.png',
        tags: ['Next.js', 'Framer Motion', 'Tailwind'],
        category: 'landing',
        featured: true,
        gradient: 'from-slate-600/40 to-gray-600/30'
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

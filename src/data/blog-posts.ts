export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'landing-page-que-converte',
        title: '5 Elementos que Toda Landing Page Precisa para Converter',
        excerpt: 'Descubra os componentes essenciais que transformam visitantes em clientes. Baseado em análises de páginas com taxas de conversão acima de 10%.',
        date: '2025-01-20',
        readTime: '5 min',
        category: 'Landing Pages',
        tags: ['conversão', 'design', 'marketing'],
        featured: true,
    },
    {
        slug: 'react-native-vs-flutter',
        title: 'React Native vs Flutter em 2025: Qual Escolher?',
        excerpt: 'Uma análise técnica e prática comparando as duas principais tecnologias para desenvolvimento mobile multiplataforma.',
        date: '2025-01-15',
        readTime: '8 min',
        category: 'Mobile',
        tags: ['react native', 'flutter', 'mobile'],
        featured: true,
    },
    {
        slug: 'automacao-pequenos-negocios',
        title: 'Como Automações Simples Podem Economizar 20h Por Semana',
        excerpt: 'Cases reais de pequenos negócios que automatizaram tarefas repetitivas e ganharam tempo para focar no que importa.',
        date: '2025-01-10',
        readTime: '6 min',
        category: 'Automação',
        tags: ['automação', 'produtividade', 'negócios'],
        featured: false,
    },
    {
        slug: 'quanto-custa-um-app',
        title: 'Quanto Custa Desenvolver um Aplicativo em 2025?',
        excerpt: 'Guia completo de precificação: fatores que influenciam o custo, faixas de preço por tipo de app e como economizar sem perder qualidade.',
        date: '2025-01-05',
        readTime: '7 min',
        category: 'Negócios',
        tags: ['precificação', 'app', 'orçamento'],
        featured: false,
    },
];

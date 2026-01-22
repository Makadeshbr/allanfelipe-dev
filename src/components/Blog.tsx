'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

// Dados dos posts - futuramente pode vir de um CMS ou MDX
export const blogPosts = [
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

interface BlogCardProps {
  post: typeof blogPosts[0];
  index: number;
  featured?: boolean;
}

function BlogCard({ post, index, featured = false }: BlogCardProps) {
  return (
    <motion.article
      className={`group bg-white border border-black/5 rounded-lg overflow-hidden hover:border-[#0D9488]/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 ${featured ? 'md:col-span-2' : ''
        }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Category Bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#0D9488] to-[#14B8A6]" />

      <div className={`p-6 lg:p-8 ${featured ? 'lg:p-10' : ''}`}>
        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-[#0D9488]/10 font-mono text-xs text-[#0D9488]">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-sm text-[#A1A1A1]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-[#1A1A1A] mb-3 group-hover:text-[#0D9488] transition-colors ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className={`text-[#6B6B6B] leading-relaxed mb-6 ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-[#F3F3F0] text-xs text-[#6B6B6B]"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-mono text-sm text-[#1A1A1A] group-hover:text-[#0D9488] transition-colors"
        >
          <span>Ler artigo</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

export function BlogList() {
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAF8]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
            <span className="w-8 h-[1px] bg-[#0D9488]" />
            Blog
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6">
            Artigos & <span className="text-gradient">Insights</span>
          </h1>

          <p className="text-lg text-[#6B6B6B] leading-relaxed">
            Compartilho conhecimento sobre desenvolvimento, tecnologia e negócios digitais.
            Conteúdo prático para quem quer criar produtos que funcionam.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} featured />
          ))}
        </div>

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {regularPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index + featuredPosts.length} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          className="mt-20 bg-[#0A0A0A] p-8 lg:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
            Receba novos artigos por email
          </h3>
          <p className="text-[#A1A1A1] mb-8 max-w-lg mx-auto">
            Sem spam. Apenas conteúdo relevante sobre desenvolvimento e tecnologia,
            direto na sua caixa de entrada.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/10 text-white placeholder-[#6B6B6B] focus:outline-none focus:border-[#0D9488] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0D9488] text-white font-mono text-sm font-medium hover:bg-[#0F766E] transition-colors"
            >
              Inscrever
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// Componente de preview para a home page
export function BlogPreview() {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-[#F3F3F0]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
              <span className="w-8 h-[1px] bg-[#0D9488]" />
              Blog
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Últimos <span className="text-gradient">artigos</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#1A1A1A] hover:text-[#0D9488] transition-colors"
          >
            <span>Ver todos os artigos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {previewPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

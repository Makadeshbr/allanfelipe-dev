import { Header, Footer } from '@/components';
import { blogPosts } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post não encontrado' };
  }

  return {
    title: `${post.title} | Allan Felipe`,
    description: post.excerpt,
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function renderMarkdown(content: string): string {
  // Configure marked for better output
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return marked.parse(content) as string;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="noise-overlay" />
      <Header />
      <main className="pt-20">
        <article className="py-16 lg:py-24">
          <div className="max-w-[800px] mx-auto px-6 md:px-12">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#6B6B6B] hover:text-[#0D9488] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o blog
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
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
                    {post.readTime} de leitura
                  </span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-[#6B6B6B] leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent mb-12" />

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-p:text-[#6B6B6B] prose-p:leading-relaxed prose-strong:text-[#1A1A1A] prose-a:text-[#0D9488] prose-a:no-underline hover:prose-a:underline prose-code:bg-[#F3F3F0] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[#1A1A1A] prose-code:before:content-none prose-code:after:content-none prose-ul:text-[#6B6B6B] prose-ol:text-[#6B6B6B] prose-li:marker:text-[#0D9488] prose-table:border-collapse prose-th:bg-[#F3F3F0] prose-th:p-3 prose-th:text-left prose-th:font-mono prose-th:text-sm prose-td:p-3 prose-td:border-t prose-td:border-black/10">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
              ) : (
                <div className="bg-[#F3F3F0] border border-black/5 p-8 lg:p-12 text-center">
                  <p className="text-[#6B6B6B] mb-4">
                    📝 Conteúdo em breve
                  </p>
                </div>
              )}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-black/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[#6B6B6B]">Compartilhar:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://allanfelipe.dev/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#F3F3F0] text-[#6B6B6B] hover:bg-[#1DA1F2] hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://allanfelipe.dev/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#F3F3F0] text-[#6B6B6B] hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="mt-12 bg-[#F3F3F0] p-6 lg:p-8 flex items-start gap-6">
              <div className="w-16 h-16 bg-[#0D9488]/10 flex items-center justify-center font-display text-xl font-bold text-[#0D9488]">
                AF
              </div>
              <div>
                <h4 className="font-display font-bold text-[#1A1A1A] mb-1">Allan Felipe</h4>
                <p className="text-sm text-[#6B6B6B] mb-3">Desenvolvedor Full Stack & Mobile</p>
                <p className="text-sm text-[#A1A1A1]">
                  Transformo ideias em produtos digitais. Especialista em React, React Native e soluções backend escaláveis.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-[#0A0A0A] p-8 lg:p-10 text-center">
              <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-4">
                Tem um projeto em mente?
              </h3>
              <p className="text-[#A1A1A1] mb-6">
                Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
              </p>
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] text-white font-mono text-sm font-medium hover:bg-[#0F766E] transition-colors"
              >
                Entrar em contato
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

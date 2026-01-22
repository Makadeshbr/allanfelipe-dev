import { Header, Footer } from '@/components';
import { BlogList } from '@/components/Blog';

export const metadata = {
  title: 'Blog | Allan Felipe - Desenvolvedor Full Stack',
  description: 'Artigos sobre desenvolvimento web, mobile, automações e negócios digitais. Conteúdo prático para criar produtos que funcionam.',
};

export default function BlogPage() {
  return (
    <>
      <div className="noise-overlay" />
      <Header />
      <main className="pt-20">
        <BlogList />
      </main>
      <Footer />
    </>
  );
}

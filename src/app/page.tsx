import {
  Header,
  Hero,
  Services,
  Projects,
  Results,
  About,
  BlogPreview,
  Contact,
  Footer
} from '@/components';

export default function Home() {
  return (
    <>
      {/* Noise texture overlay para dar textura ao design */}
      <div className="noise-overlay" />

      {/* Header/Navegação fixo */}
      <Header />

      {/* Conteúdo principal */}
      <main>
        {/* Seção Hero - Primeira impressão */}
        <Hero />

        {/* Seção de Serviços */}
        <Services />

        {/* Seção de Projetos/Portfólio */}
        <Projects />

        {/* Seção de Resultados/Métricas */}
        <Results />

        {/* Seção Sobre */}
        <About />

        {/* Preview dos últimos artigos do Blog */}
        <BlogPreview />

        {/* Seção de Contato */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

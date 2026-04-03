import { useParams } from "wouter";

export default function ProjectDetail() {
  const params = useParams();
  
  return (
    <div className="container mx-auto py-24 pt-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-[family-name:var(--font-display)] font-bold text-white mb-6">Em Breve</h1>
      <p className="text-white/60 text-lg max-w-lg mx-auto">
        Os detalhes detalhados do projeto {params.id ? <span className="text-[#0A84FF]">{params.id}</span> : ""} estarão disponíveis nesta página muito em breve!
      </p>
      <a href="/" className="mt-8 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white text-sm transition-colors cursor-pointer inline-flex">
        Voltar para o Início
      </a>
    </div>
  );
}

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: "mechago",
    title: "MechaGo",
    subtitle: "Sistema de Gestão para Oficinas Mecânicas",
    problem: "Oficinas mecânicas gerenciam ordens de serviço, peças e clientes em planilhas ou papel, gerando perda de dados e ineficiência.",
    solution: "Plataforma web completa com dashboard, controle de OS, gestão de estoque de peças e histórico de clientes com busca inteligente.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    result: "Sistema em uso real, reduzindo tempo de gestão em 60%.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663209856095/7VQnJvMrA96NuiFaSE9E2T/project-mechago-aVb9HnXDzuR86La2HhoLd3.webp",
    github: "https://github.com/Makadeshbr/MechaGo",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "barbershop",
    title: "Agendai Barbearia",
    subtitle: "Site Premium + Sistema de Agendamento",
    problem: "Barbearias perdem clientes por falta de presença digital e sistema de agendamento profissional.",
    solution: "Site responsivo com design premium, sistema de agendamento online, galeria de serviços, blog integrado e conformidade LGPD.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    result: "Template reutilizável para múltiplos clientes do segmento.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663209856095/7VQnJvMrA96NuiFaSE9E2T/project-barbershop-dcA2AhX4amkW6Aa6UApsTV.webp",
    github: "https://github.com/Makadeshbr/Agendai-Barbearia",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "fitness",
    title: "Gestor de Treinos",
    subtitle: "App Mobile de Gestão de Treinos",
    problem: "Praticantes de musculação precisam de um app simples para montar, acompanhar e evoluir seus treinos sem depender de personal.",
    solution: "Aplicativo mobile com criação de treinos personalizados, timer de descanso, seletor de grupos musculares e histórico de evolução.",
    stack: ["React Native", "TypeScript", "Expo", "AsyncStorage"],
    result: "App funcional com interface intuitiva e uso offline.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663209856095/7VQnJvMrA96NuiFaSE9E2T/project-fitness-NAfA3CxpG89wUujqVj7vZ9.webp",
    github: "https://github.com/Makadeshbr/gestor-de-treinos-app",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    id: "supplements",
    title: "Monster Fiber",
    subtitle: "E-commerce Premium de Suplementos",
    problem: "Loja física de suplementos em Avaré precisava de presença digital premium para competir com grandes redes online.",
    solution: "Site dark premium com glassmorphism, parallax real, animações Apple-style, vitrine de produtos e integração WhatsApp para conversão.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "FastAPI"],
    result: "Site em produção com aumento significativo de contatos via WhatsApp.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663209856095/7VQnJvMrA96NuiFaSE9E2T/project-supplements-9dHSZ8DG58tTawpf6AHcZQ.webp",
    github: "https://github.com/Makadeshbr/SitedeSuplementos",
    gradient: "from-purple-500/20 to-indigo-500/10",
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[#0A84FF] text-xs font-mono uppercase tracking-[0.3em] mb-3 block">
            Portfólio
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Projetos que resolvem
            <br />
            <span className="text-white/40">problemas reais.</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className={`relative rounded-2xl overflow-hidden glass-card hover:border-white/10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(10,132,255,0.08)]`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video lg:aspect-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0B0B]/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 to-transparent lg:hidden" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <span className="text-[#0A84FF] text-[10px] font-mono uppercase tracking-[0.3em] mb-2">
                      {project.subtitle}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl text-white mb-4 tracking-tight">
                      {project.title}
                    </h3>

                    {/* Problem / Solution */}
                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">Problema</span>
                        <p className="text-white/50 text-sm mt-1 leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">Solução</span>
                        <p className="text-white/50 text-sm mt-1 leading-relaxed">{project.solution}</p>
                      </div>
                      <div>
                        <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">Resultado</span>
                        <p className="text-[#0A84FF]/80 text-sm mt-1 font-medium">{project.result}</p>
                      </div>
                    </div>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-mono text-white/40 bg-white/[0.04] rounded-md border border-white/[0.06] uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 hover:bg-white/[0.04]"
                      >
                        <Github size={14} />
                        Código
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function Blog() {
  return (
    <section id="blog" className="py-24 lg:py-32 relative">
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
            Conhecimento
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Artigos e Insights
            <br />
            <span className="text-white/40">sobre desenvolvimento.</span>
          </h2>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-card rounded-xl overflow-hidden hover:border-white/10 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-white/[0.02]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-mono text-white/60 bg-white/[0.08] rounded-full border border-white/10">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-3 line-clamp-2 group-hover:text-[#0A84FF] transition-colors">
                  {post.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-white/40 mb-6 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime} min de leitura
                  </div>
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-sm font-medium text-[#0A84FF] hover:text-[#0A84FF]/80 transition-colors group/btn">
                  Ler Artigo
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
            Ver Todos os Artigos
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

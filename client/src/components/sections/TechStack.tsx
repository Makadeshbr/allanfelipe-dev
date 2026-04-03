import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend",
    techs: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#ffffff" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Framer Motion", color: "#FF0055" },
    ],
  },
  {
    title: "Backend",
    techs: [
      { name: "Node.js", color: "#339933" },
      { name: "Express", color: "#ffffff" },
      { name: "Prisma", color: "#2D3748" },
      { name: "FastAPI", color: "#009688" },
    ],
  },
  {
    title: "Banco de Dados",
    techs: [
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "MongoDB", color: "#47A248" },
      { name: "SQLite", color: "#003B57" },
    ],
  },
  {
    title: "Mobile & Ferramentas",
    techs: [
      { name: "React Native", color: "#61DAFB" },
      { name: "Expo", color: "#000020" },
      { name: "Git", color: "#F05032" },
      { name: "Docker", color: "#2496ED" },
      { name: "Vercel", color: "#ffffff" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="py-24 lg:py-32 relative border-t border-white/[0.04]">
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
            Tecnologias
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Stack que domino
            <br />
            <span className="text-white/40">no dia a dia.</span>
          </h2>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="glass-card rounded-xl p-6 lg:p-8 hover:border-white/10 transition-all duration-500 group"
            >
              <h3 className="text-xs text-white/30 uppercase tracking-[0.2em] font-semibold mb-6">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}40` }}
                    />
                    <span className="text-sm text-white/60 group-hover:text-white/80 font-medium transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

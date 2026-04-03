import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const languagesData = [
  { name: "TypeScript", value: 35, color: "#3178C6" },
  { name: "React", value: 25, color: "#61DAFB" },
  { name: "Node.js", value: 20, color: "#68A063" },
  { name: "Python", value: 15, color: "#3776AB" },
  { name: "Outros", value: 5, color: "#666666" },
];

const projectsData = [
  { category: "Frontend", count: 8 },
  { category: "Backend", count: 6 },
  { category: "Full Stack", count: 7 },
  { category: "Mobile", count: 3 },
];

export default function Statistics() {
  return (
    <section className="py-24 lg:py-32 relative">
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
            Análise
          </span>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Estatísticas e Expertise
          </h2>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Languages Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-8"
          >
            <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-6">
              Linguagens Mais Usadas
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languagesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {languagesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(11, 11, 11, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {languagesData.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-xs text-white/60">
                    {lang.name} ({lang.value}%)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-xl p-8"
          >
            <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-6">
              Projetos por Categoria
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="category" stroke="rgba(255, 255, 255, 0.4)" />
                <YAxis stroke="rgba(255, 255, 255, 0.4)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(11, 11, 11, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" fill="#0A84FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 8, suffix: "+", label: "Projetos entregues" },
  { value: 3, suffix: "+", label: "Sistemas em produção" },
  { value: 2, suffix: "+", label: "Anos de experiência" },
  { value: 100, suffix: "%", label: "Full Stack" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl lg:text-5xl text-white tabular-nums">
      {count}
      <span className="text-[#0A84FF]">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 lg:py-24 border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0d0d0d] to-[#0B0B0B]" />
      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center lg:text-left"
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-white/30 text-xs sm:text-sm mt-2 uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

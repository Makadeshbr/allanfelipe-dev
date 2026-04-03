import { motion } from "framer-motion";
import { MessageCircle, Mail, X } from "lucide-react";
import { useState } from "react";

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/5511999999999",
      color: "#25D366",
      delay: 0.1,
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:allanfelipe@dev.com",
      color: "#0A84FF",
      delay: 0.2,
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[#0A84FF] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.div>
      </motion.button>

      {/* Menu Options */}
      <motion.div
        className="fixed bottom-24 right-8 z-40 flex flex-col gap-3"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {contactOptions.map((option, i) => {
          const Icon = option.icon;
          return (
            <motion.a
              key={i}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.95] backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, x: 20 }}
              animate={
                isOpen
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 20 }
              }
              transition={{ delay: option.delay, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: option.color }}
              >
                <Icon size={18} />
              </div>
              <span className="text-sm font-medium text-[#0B0B0B] whitespace-nowrap">
                {option.label}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </>
  );
}

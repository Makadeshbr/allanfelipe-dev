'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MessageSquare, Mail, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xbdglnzb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          service: formState.service,
          budget: formState.budget,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.');
      }
    } catch {
      alert('Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'allanwesy17@gmail.com', href: 'mailto:allanwesy17@gmail.com' },
    { icon: MessageSquare, label: 'WhatsApp', value: '+55 (14) 99161-8312', href: 'https://wa.me/5514991618312' },
    { icon: MapPin, label: 'Localização', value: 'Brasil - Atendimento Remoto', href: null },
    { icon: Clock, label: 'Tempo de resposta', value: 'Até 24 horas', href: null },
  ];

  return (
    <section id="contato" className="py-24 lg:py-32 bg-[#FAFAF8]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 font-mono text-sm text-[#0D9488] mb-4">
              <span className="w-8 h-[1px] bg-[#0D9488]" />Contato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6">
              Vamos construir algo <span className="text-gradient">incrível juntos?</span>
            </h2>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-12">
              Tem um projeto em mente? Me conta sua ideia e vamos transformá-la em realidade.
            </p>
            <div className="space-y-6 mb-12">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#F3F3F0] group-hover:bg-[#0D9488]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#A1A1A1] block mb-1">{item.label}</span>
                      <span className="text-[#1A1A1A] font-medium group-hover:text-[#0D9488] transition-colors">{item.value}</span>
                    </div>
                  </div>
                );
                return item.href ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{content}</a> : <div key={item.label}>{content}</div>;
              })}
            </div>
            <a href="https://wa.me/5514991618312?text=Olá! Vim pelo site e gostaria de conversar sobre um projeto." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-4 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#128C7E] transition-all duration-300">
              <MessageSquare className="w-5 h-5" />Conversar pelo WhatsApp
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="bg-white border border-black/5 rounded-lg p-8 lg:p-10 shadow-lg">
              {isSubmitted ? (
                <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#0D9488]/10 rounded-full">
                    <CheckCircle className="w-8 h-8 text-[#0D9488]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-4">Mensagem enviada!</h3>
                  <p className="text-[#6B6B6B] mb-6">Obrigado pelo contato. Vou analisar sua mensagem e retorno em breve.</p>
                  <button onClick={() => { setIsSubmitted(false); setFormState({ name: '', email: '', service: '', budget: '', message: '' }); }} className="font-mono text-sm text-[#0D9488] hover:underline">Enviar outra mensagem</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-mono text-xs text-[#6B6B6B] mb-2">Nome *</label>
                      <input type="text" id="name" name="name" required value={formState.name} onChange={handleChange} className="w-full px-4 py-3 bg-[#F3F3F0] border-0 text-[#1A1A1A] placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-mono text-xs text-[#6B6B6B] mb-2">Email *</label>
                      <input type="email" id="email" name="email" required value={formState.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#F3F3F0] border-0 text-[#1A1A1A] placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block font-mono text-xs text-[#6B6B6B] mb-2">Tipo de projeto</label>
                      <select id="service" name="service" value={formState.service} onChange={handleChange} className="w-full px-4 py-3 bg-[#F3F3F0] border-0 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all">
                        <option value="">Selecione...</option>
                        <option value="landing">Landing Page</option>
                        <option value="site">Site / Sistema Web</option>
                        <option value="app">Aplicativo Mobile</option>
                        <option value="automacao">Automação</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block font-mono text-xs text-[#6B6B6B] mb-2">Orçamento estimado</label>
                      <select id="budget" name="budget" value={formState.budget} onChange={handleChange} className="w-full px-4 py-3 bg-[#F3F3F0] border-0 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all">
                        <option value="">Selecione...</option>
                        <option value="1k-3k">R$ 1.000 - R$ 3.000</option>
                        <option value="3k-5k">R$ 3.000 - R$ 5.000</option>
                        <option value="5k-10k">R$ 5.000 - R$ 10.000</option>
                        <option value="10k+">Acima de R$ 10.000</option>
                        <option value="nao-sei">Não sei ainda</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-mono text-xs text-[#6B6B6B] mb-2">Conte sobre seu projeto *</label>
                    <textarea id="message" name="message" required rows={5} value={formState.message} onChange={handleChange} className="w-full px-4 py-3 bg-[#F3F3F0] border-0 text-[#1A1A1A] placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all resize-none" placeholder="Descreva sua ideia, objetivos e prazo desejado..." />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#FAFAF8] font-mono text-sm font-medium rounded-lg hover:bg-[#0D9488] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300">
                    {isSubmitting ? (<><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>) : (<><Send className="w-4 h-4" />Enviar mensagem</>)}
                  </button>
                  <p className="text-center text-xs text-[#A1A1A1] mt-4">Respondo em até 24 horas úteis</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

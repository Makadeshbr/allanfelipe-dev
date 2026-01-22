# allanfelipe.dev - Portfólio Freelancer

Site profissional para captação de clientes freelancer. Design único que foge do padrão "AI genérico", com conceito **Terminal Meets Editorial Luxury**.

## 🚀 Deploy Rápido na Vercel

1. **Crie um repositório no GitHub** e faça push deste código
2. **Acesse [vercel.com](https://vercel.com)** e conecte sua conta GitHub
3. **Importe o repositório** - Vercel detecta Next.js automaticamente
4. **Configure o domínio**: Vá em Settings → Domains → Adicione `allanfelipe.dev`
5. **Compre o domínio** diretamente na Vercel ou configure DNS externo

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css      # Design system completo
│   ├── layout.tsx       # Layout com SEO otimizado
│   └── page.tsx         # Página principal
├── components/
│   ├── Logo.tsx         # Logo animado <AF/>
│   ├── Header.tsx       # Navegação fixa
│   ├── Hero.tsx         # Seção principal com terminal animado
│   ├── Services.tsx     # Cards de serviços
│   ├── Projects.tsx     # Showcase de projetos
│   ├── About.tsx        # Sobre + Stack técnico
│   ├── Contact.tsx      # Formulário de contato
│   └── Footer.tsx       # Footer com links
```

## ⚙️ Personalizações Necessárias

### 1. Informações de Contato
Edite `src/components/Contact.tsx`:
- Substitua `+55 (XX) XXXXX-XXXX` pelo seu número real
- Atualize o link do WhatsApp com seu número

### 2. Links Sociais
Edite `src/components/Hero.tsx` e `src/components/Footer.tsx`:
- GitHub: seu username real
- LinkedIn: seu perfil real
- Instagram: (se tiver)
- Email: seu email real

### 3. Projetos
Edite `src/components/Projects.tsx`:
- Adicione screenshots reais dos seus projetos em `public/projects/`
- Atualize links e descrições

### 4. Imagem OG (compartilhamento)
Crie uma imagem 1200x630px e salve como `public/og-image.png`

## 🎨 Stack Tecnológico

- **Next.js 16** - App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones

## 📝 Comandos

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção localmente
npm start

# Lint
npm run lint
```

## 🔧 Próximos Passos Sugeridos

1. **Integrar formulário de contato** com seu backend Aether ou Resend
2. **Adicionar Google Analytics** para tracking de conversões
3. **Criar página de blog** para SEO orgânico
4. **Adicionar depoimentos** de clientes anteriores
5. **Implementar chat** via WhatsApp Widget ou Crisp

---

**Feito com ♥ e muito café**

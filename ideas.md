# Brainstorm de Design — Portfólio Allan Felipe

## Objetivo
Criar um portfólio que faça recrutadores pensarem: "Esse desenvolvedor sabe o que está fazendo."

---

<response>
## Idea 1: "Terminal Noir" — Estética Hacker Elegante
<probability>0.07</probability>

### Design Movement
Inspirado em terminais de código e interfaces de ferramentas dev como Warp, Fig e Raycast. Fundo escuro absoluto com tipografia monoespaçada e acentos em verde neon.

### Core Principles
1. Código como identidade visual — elementos de UI que parecem output de terminal
2. Minimalismo radical — zero decoração, apenas informação
3. Interatividade de comando — navegação por "comandos" visuais
4. Contraste extremo — fundo #000 com texto branco e acentos neon

### Color Philosophy
Preto absoluto (#000000) com verde terminal (#00FF41) e branco puro. A paleta comunica domínio técnico e seriedade.

### Layout Paradigm
Layout vertical de terminal com blocos de "output" que revelam conteúdo conforme o scroll. Sem grid convencional.

### Signature Elements
- Cursor piscante como indicador de seção ativa
- Blocos de código estilizados como cards de projeto
- Prompt `$` antes de cada título de seção

### Interaction Philosophy
Hover revela "tooltips" estilo man page. Cliques simulam execução de comandos.

### Animation
Texto aparece como se estivesse sendo digitado (typewriter). Transições de fade rápidas e secas.

### Typography System
Monospace (JetBrains Mono) para headlines e corpo. Sans-serif (Inter) apenas para descrições longas.
</response>

---

<response>
## Idea 2: "Vercel Craft" — Minimalismo Técnico Premium
<probability>0.08</probability>

### Design Movement
Inspirado na estética da Vercel, Linear e Stripe. Fundo escuro profundo (#0B0B0B) com acentos em azul elétrico (#0A84FF). Design que comunica competência técnica sem esforço.

### Core Principles
1. Clareza acima de tudo — hierarquia visual imediata, sem ruído
2. Profundidade sutil — camadas de blur, sombras e gradientes que criam dimensão
3. Tipografia como arquitetura — fontes que estruturam a página como um blueprint
4. Espaço como luxo — whitespace generoso que comunica confiança e senioridade

### Color Philosophy
Fundo #0B0B0B (quase preto, mas com calor). Azul elétrico #0A84FF como cor de destaque — comunica tecnologia, confiança e modernidade. Texto em branco com opacidades variadas (100%, 70%, 40%) para criar hierarquia sem cores adicionais.

### Layout Paradigm
Layout assimétrico com seções full-width que alternam entre texto à esquerda e conteúdo visual à direita. Hero com parallax leve. Projetos em layout de "case study" com imagens grandes e texto sobreposto.

### Signature Elements
- Linhas de grade sutis (1px, 5% opacidade) como textura de fundo
- Badges com glassmorphism para tags de tecnologia
- Gradiente azul que "respira" sutilmente no hero

### Interaction Philosophy
Hover com scale sutil (1.02) e glow azul. Scroll reveal com blur-to-sharp (estilo Apple). Micro-interações que recompensam a exploração sem distrair.

### Animation
- Entrada: fade + translateY(20px) + blur(10px) → clear (0.6s, ease-out)
- Hover: scale(1.02) + boxShadow glow (0.3s)
- Scroll: parallax leve no hero (0.4x)
- Stagger: 80ms entre elementos de lista

### Typography System
- Headlines: **Space Grotesk** (Bold/Black) — geométrica, moderna, com personalidade técnica
- Body: **Inter** (Regular/Medium) — legibilidade máxima em telas
- Monospace: **JetBrains Mono** — para tags de tecnologia e código
- Hierarquia: H1 (5xl-7xl), H2 (3xl-5xl), Body (base-lg), Caption (xs-sm uppercase tracking-widest)
</response>

---

<response>
## Idea 3: "Brutalist Editorial" — Anti-Template Radical
<probability>0.05</probability>

### Design Movement
Inspirado no brutalismo digital e design editorial de revistas como Bloomberg Businessweek. Tipografia oversized, layouts quebrados e assimetria proposital.

### Core Principles
1. Tipografia como protagonista — letras enormes que dominam a tela
2. Assimetria calculada — nada está "centralizado" por acidente
3. Contraste de escala — elementos muito grandes ao lado de muito pequenos
4. Autenticidade crua — sem polish excessivo, sem gradientes suaves

### Color Philosophy
Preto e branco com uma única cor de acento (vermelho #FF3B30 ou azul #0A84FF). A limitação cromática força o foco no conteúdo e na tipografia.

### Layout Paradigm
Grid quebrado com overlaps intencionais. Texto que invade imagens. Seções com alturas variáveis e margens assimétricas.

### Signature Elements
- Números de seção enormes (200px+) como marcadores visuais
- Linhas divisórias grossas e irregulares
- Mix de tipografia serif e sans-serif na mesma headline

### Interaction Philosophy
Hover com deslocamento de elementos (translate). Scroll com parallax agressivo em camadas diferentes.

### Animation
Transições bruscas e rápidas (0.2s). Elementos que "saltam" para a posição. Sem ease suave — cubic-bezier agressivo.

### Typography System
- Headlines: **Clash Display** (Bold) — personalidade forte, anti-genérica
- Body: **Satoshi** (Regular) — moderna e legível
- Accent: **Space Mono** — para dados e métricas
</response>

---

## Escolha Final: **Idea 2 — "Vercel Craft"**

### Justificativa
Esta abordagem é a mais estratégica para o objetivo de contratação porque:
1. Comunica **competência técnica** sem parecer amador ou excessivo
2. O estilo Vercel/Linear é reconhecido por recrutadores de tech como sinônimo de qualidade
3. O minimalismo premium permite que os **projetos reais** sejam o foco
4. A paleta escura com azul elétrico é moderna sem ser clichê
5. A tipografia Space Grotesk diferencia o portfólio de templates genéricos com Inter

### Compromissos de Design
- Fundo: #0B0B0B
- Accent: #0A84FF
- Font Display: Space Grotesk
- Font Body: Inter
- Animações: Blur-to-sharp, scale hover, parallax leve
- Layout: Assimétrico, full-width sections, case study format

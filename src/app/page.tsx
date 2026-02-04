/**
 * ============================================
 * HOME PAGE - Estilo 1minus1.com
 * ============================================
 * 
 * Estrutura simplificada:
 * 1. Hero com Showreel
 * 2. Services Grid
 * 3. Stats
 * 4. Featured Cases
 * 5. Clients (simplificado)
 * 
 * Contato agora é modal fullscreen (ContactModal)
 */

import {
  Hero,
  Services,
  Stats,
  FeaturedCases,
  Clients,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      {/* Hero com Showreel */}
      <Hero />

      {/* Services Preview */}
      <Services />

      {/* Stats - Resultados */}
      <Stats />

      {/* Featured Cases - Grid */}
      <FeaturedCases />

      {/* Clients - Nichos */}
      <Clients />
    </>
  );
}

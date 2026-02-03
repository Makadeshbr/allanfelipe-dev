/**
 * ============================================
 * HOME PAGE - Otimizada conforme Auditoria UX
 * ============================================
 * 
 * Estrutura simplificada:
 * 1. Hero com Showreel
 * 2. Services Grid
 * 3. Stats
 * 4. Featured Cases
 * 5. Clients (simplificado)
 * 6. Contact CTA
 */

import {
  Hero,
  Services,
  Stats,
  FeaturedCases,
  Clients,
  Contact
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

      {/* Contact CTA */}
      <Contact />
    </>
  );
}

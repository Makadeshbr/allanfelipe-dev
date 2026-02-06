'use client';

import {
  Hero,
  Services,
  Stats,
  FeaturedCases,
  Clients,
} from '@/components/sections';
import { JourneyDots } from '@/components/ui';

const homeSections = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'stats', label: 'Results' },
  { id: 'cases', label: 'Work' },
  { id: 'clients', label: 'Clients' },
];

export default function HomePage() {
  return (
    <>
      <JourneyDots sections={homeSections} />

      <div id="hero">
        <Hero />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="stats">
        <Stats />
      </div>

      <div id="cases">
        <FeaturedCases />
      </div>

      <div id="clients">
        <Clients />
      </div>
    </>
  );
}

import {
  Hero,
  Services,
  TechStack,
  Syntalys,
  FeaturedProjects,
  Testimonials,
  Contact,
  FreeTools,
  XenaCodeAIPromo,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <Testimonials />
      <TechStack />
      <XenaCodeAIPromo />
      <FreeTools />
      <Syntalys />
      <Contact />
    </>
  );
}

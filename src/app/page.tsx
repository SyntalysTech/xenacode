import {
  Hero,
  Services,
  TechStack,
  Syntalys,
  FeaturedProjects,
  Testimonials,
  Contact,
  FreeTools,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <TechStack />
      <FeaturedProjects />
      <Syntalys />
      <Testimonials />
      <Contact />
      <FreeTools />
    </>
  );
}

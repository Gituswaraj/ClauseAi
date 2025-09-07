// src/pages/Home/Home.jsx
import React from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../sections/Hero/Hero';

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <div id="hero" className="scroll-mt-24 md:scroll-mt-28">
        <HeroSection />
      </div>

      {/*
        Upcoming sections (placeholders):
        - <CompanyLogos />
        - <TestimonialGrid />
        - <FeatureSection />
        - <StealthFeatures />
        - <PlatformCompatibility />
        - <CommandShowcase />
        - <PricingSection />
        - <FAQSection />
        - <CTASection />
      */}
    </Layout>
  );
}
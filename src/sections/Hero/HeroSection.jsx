// src/sections/Hero/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

// Optional: when HeroVideo is implemented in Step 3, import and render inside the media wrapper.
// import HeroVideo from './HeroVideo';

const MotionLink = motion(Link);

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  // Fade-up helpers
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <motion.h1
            className="font-semibold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            {...fadeUp(0)}
          >
            Ace your tech interviews with AI on your side
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-4 text-base text-white/70 sm:text-lg md:text-xl"
            {...fadeUp(0.1)}
          >
            Real-time hints, solution generation, and stealth assistance during live interviews.
            Built for developers, optimized for results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            {...fadeUp(0.2)}
          >
            <MotionLink
              to="/pricing"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Start Free Trial
            </MotionLink>

            <MotionLink
              to="/demo"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition sm:w-auto hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Watch Demo
            </MotionLink>
          </motion.div>
        </div>

        {/* Media container (HeroVideo placeholder) */}
        <motion.div
          aria-label="Product demo media"
          className="mx-auto mt-10 max-w-5xl"
          {...fadeUp(0.3)}
        >
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl shadow-purple-900/20 backdrop-blur-sm">
            {/* Glow effect */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-2xl opacity-30 blur-2xl"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 0%, rgba(168,85,247,0.25), rgba(236,72,153,0.15), transparent 70%)',
              }}
            />
            {/* Replace placeholder with <HeroVideo /> in Step 3 */}
            <div className="relative aspect-video w-full bg-black/50">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm font-medium text-white/50">
                  HeroVideo placeholder (Step 3)
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* HeroStats placeholder */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[
              { label: 'Candidates Assisted', value: '25k+' },
              { label: 'Avg. Time Saved', value: '12 hrs/mo' },
              { label: 'Success Boost', value: 'x3 offers' },
              { label: 'Stealth Reliability', value: 'Undetectable*' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
              >
                <div className="text-xl font-semibold text-white sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-white/40">
            *Stealth depends on platform compatibility and configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
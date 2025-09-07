// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Placeholder Footer (to be implemented later)
function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-transparent py-8 text-center text-sm text-white/60">
      {/* TODO: Replace with real footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        Footer placeholder
      </div>
    </footer>
  );
}

export default function Layout({ children, navProps = {} }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background gradient layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-fixed bg-no-repeat"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)',
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Optional: Skip link for a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-black/70 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <Navbar {...navProps} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
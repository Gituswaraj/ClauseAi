// src/components/layout/Navbar.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Navigation items: use Link for routes, anchors for in-page sections
const NAV_LINKS = [
  { label: 'Features', to: '#features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Demo', to: '/demo' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

function isHashLink(to) {
  return typeof to === 'string' && to.startsWith('#');
}

export default function Navbar({ isScrolled = false }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track hash changes for active state on anchor links
  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange, { passive: true });
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Body scroll lock + focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusTrap = (e) => {
      if (!panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(focusableSelectors);
      if (!focusables.length) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', focusTrap);
    // Move focus to first interactive element in the panel
    requestAnimationFrame(() => {
      if (!panelRef.current) return;
      const first = panelRef.current.querySelector(focusableSelectors);
      first?.focus();
    });

    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', focusTrap);
      // Restore focus to trigger button
      triggerRef.current?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  const navClasses = useMemo(
    () =>
      [
        'sticky top-0 z-50 w-full',
        'bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30',
        'transition-all duration-300',
        isScrolled ? 'py-2 shadow-md' : 'py-3 md:py-4 shadow-none',
      ].join(' '),
    [isScrolled]
  );

  const containerClasses =
    'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between';

  const isActive = (to) => {
    if (isHashLink(to)) {
      return currentHash === to;
    }
    return location.pathname === to;
  };

  // Framer Motion variants
  const panelVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <header className={navClasses}>
      <div className={containerClasses}>
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {/* Placeholder logo mark */}
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-fuchsia-600">
              <span className="sr-only">InterviewCoder</span>
            </span>
            <span className="hidden sm:inline-block tracking-tight">InterviewCoder</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="relative hidden md:flex items-center gap-1">
          <ul
            className="flex items-center gap-1 rounded-lg bg-white/0 p-1"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_LINKS.map((item, idx) => {
              const active = isActive(item.to);
              const baseClasses =
                'relative z-10 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]';
              const Wrapper = isHashLink(item.to) ? 'a' : Link;

              return (
                <li key={item.label} className="relative">
                  {/* Animated hover/active background (Vercel-style) */}
                  {(active || hoveredIndex === idx) && (
                    <motion.span
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 rounded-md bg-white/5"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <Wrapper
                    href={isHashLink(item.to) ? item.to : undefined}
                    to={!isHashLink(item.to) ? item.to : undefined}
                    className={baseClasses}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onClick={() => isHashLink(item.to) && setHoveredIndex(null)}
                  >
                    {item.label}
                    {/* Animated underline for active item */}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="pointer-events-none absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-500"
                        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                      />
                    )}
                  </Wrapper>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="ml-3">
            <Link
              to="/pricing"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:opacity-95 active:opacity-90"
            >
              Start Free Trial
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            ref={triggerRef}
            type="button"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {/* Animated hamburger (to X) */}
            <span className="relative block h-5 w-6">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 block h-0.5 w-6 bg-white"
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-white"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                style={{ transformOrigin: 'center' }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.12 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute bottom-0 left-0 block h-0.5 w-6 bg-white"
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={closeMenu}
            />
            {/* Panel */}
            <motion.div
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              ref={panelRef}
              className="fixed inset-x-0 top-0 z-[70] mt-[64px] max-h-[calc(100vh-64px)] overflow-auto rounded-t-2xl border-t border-white/10 bg-black/70 backdrop-blur-xl p-4 pb-10 sm:p-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((item) => {
                  const active = isActive(item.to);
                  const base =
                    'block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black min-h-[44px]';
                  const Wrapper = isHashLink(item.to) ? 'a' : Link;

                  return (
                    <li key={item.label} className="relative">
                      {active && (
                        <motion.span
                          layoutId="mobile-active-bg"
                          className="absolute inset-0 rounded-lg bg-white/5"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                      <Wrapper
                        href={isHashLink(item.to) ? item.to : undefined}
                        to={!isHashLink(item.to) ? item.to : undefined}
                        className={base}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Wrapper>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 border-t border-white/10 pt-4">
                <Link
                  to="/pricing"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-95 active:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black min-h-[44px]"
                  onClick={() => setMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
// src/components/layout/MobileMenu.jsx
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Default links (can be overridden via props)
const DEFAULT_LINKS = [
  { label: 'Features', to: '#features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Demo', to: '/demo' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

const isHashLink = (to) => typeof to === 'string' && to.startsWith('#');

export default function MobileMenu({
  open = false,
  onClose = () => {},
  links = DEFAULT_LINKS,
  offsetTop = 64, // distance from top (header height)
  cta = { label: 'Start Free Trial', to: '/pricing' },
}) {
  const panelRef = useRef(null);
  const triggerReturnRef = useRef(null); // optional: set from parent to restore focus
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Dismiss on Escape and trap focus while open
  useEffect(() => {
    if (!open) return;

    // Lock scroll
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e) => {
      if (!panelRef.current) return;

      // Escape closes menu
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusables = panelRef.current.querySelectorAll(focusableSelectors);
        if (!focusables.length) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

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

    document.addEventListener('keydown', handleKeyDown);

    // Move focus inside the panel
    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector(focusableSelectors);
      first?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      root.style.overflow = prevOverflow;
      triggerReturnRef.current?.focus?.();
    };
  }, [open, onClose]);

  // Dismiss on route change (including hash changes)
  useEffect(() => {
    if (!open) return;

    // If the route (pathname) changes via <Link>, close the menu
    onClose();

    // For native hash changes (when using <a href="#...">), also close:
    const handleHashChange = () => onClose();
    window.addEventListener('hashchange', handleHashChange, { passive: true });

    return () => window.removeEventListener('hashchange', handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // intentionally ignoring other deps

  // Motion variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 420,
        damping: 32,
        mass: 0.8,
      },
    },
    exit: { opacity: 0, y: -12, transition: { duration: prefersReducedMotion ? 0 : 0.15 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dimmed/blur overlay */}
          <motion.button
            type="button"
            key="overlay"
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Slide-down panel */}
          <motion.div
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            ref={panelRef}
            className="fixed inset-x-0 z-[70] md:hidden"
            style={{ top: offsetTop }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            <div className="max-h-[calc(100vh-64px)] overflow-auto rounded-b-2xl border-t border-white/10 bg-black/70 backdrop-blur-xl p-4 sm:p-6 supports-[backdrop-filter]:bg-black/60">
              <h2 id="mobile-menu-title" className="sr-only">
                Mobile navigation
              </h2>

              <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                {links.map((item) => {
                  const Wrapper = isHashLink(item.to) ? 'a' : Link;
                  const base =
                    'relative block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black min-h-[44px]';
                  return (
                    <Wrapper
                      key={item.label}
                      href={isHashLink(item.to) ? item.to : undefined}
                      to={!isHashLink(item.to) ? item.to : undefined}
                      className={base}
                      onClick={onClose}
                    >
                      {item.label}
                    </Wrapper>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-white/10 pt-4">
                <Link
                  to={cta.to}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-95 active:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black min-h-[44px]"
                  onClick={onClose}
                >
                  {cta.label}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/*
Behavior notes:
- Motion panel slides down with a spring animation using Framer Motion.
- Larger tap targets ensured via `min-h-[44px]` and generous padding.
- CTA spans full width (`w-full`) and uses the brand gradient.
- Dismissal:
  - Overlay click calls onClose (parent controls open state).
  - Escape key closes the menu while focus is trapped inside.
  - Route changes (pathname) and hash changes trigger onClose.
- Parent component should:
  - Manage `open` state and pass `onClose`.
  - Provide `offsetTop` matching the sticky header height.
  - Optionally pass `triggerReturnRef` to restore focus to the opener.
*/
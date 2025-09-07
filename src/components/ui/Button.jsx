// src/components/ui/Button.jsx
import React, { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Tailwind + Motion Button
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'outline'
 * - size: 'sm' | 'md' | 'lg'
 * - as: element/component to render (e.g., 'button', 'a', Link)
 * - fullWidth: boolean (stretches to 100% width)
 * - disabled: boolean
 * - className: string (extra classes)
 * - type: button type (only applied if rendering a native <button>)
 *
 * Notes:
 * - Applies keyboard focus ring and disabled styles
 * - Includes hover/tap micro-interactions via Framer Motion
 * - Works with react-router-dom Link by passing `as={Link}` and `to="/path"`
 */
const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      as: As = 'button',
      fullWidth = false,
      disabled = false,
      className,
      type = 'button',
      onClick,
      children,
      ...rest
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();
    const MotionAs = motion(As);

    const base =
      'inline-flex select-none items-center justify-center gap-2 rounded-md font-semibold transition ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ' +
      'disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-sm hover:opacity-95 active:opacity-90',
      secondary:
        'border border-white/15 bg-white/5 text-white/90 backdrop-blur-sm hover:bg-white/10 hover:text-white active:bg-white/15',
      outline:
        'border border-purple-400/60 text-purple-300 hover:bg-purple-400/10 active:bg-purple-400/15',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[44px]',
      md: 'px-4 py-2.5 text-sm min-h-[44px]',
      lg: 'px-5 py-3 text-base min-h-[44px]',
    };

    const motionProps =
      disabled || reduceMotion
        ? {}
        : {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 },
          };

    const isNativeButton = As === 'button';

    const handleClick = (e) => {
      if (disabled && !isNativeButton) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    return (
      <MotionAs
        ref={ref}
        type={isNativeButton ? type : undefined}
        aria-disabled={!isNativeButton ? disabled : undefined}
        disabled={isNativeButton ? disabled : undefined}
        className={cn(
          base,
          variants[variant] || variants.primary,
          sizes[size] || sizes.md,
          fullWidth && 'w-full',
          className
        )}
        onClick={handleClick}
        {...motionProps}
        {...rest}
      >
        {children}
      </MotionAs>
    );
  }
);

Button.displayName = 'Button';

export default Button;
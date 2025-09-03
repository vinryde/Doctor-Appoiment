"use client";

import React from "react";

// Utility function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Glass Filter Component for Card
function GlassFilter() {
  const filterId = React.useId();

  return (
    <svg className="hidden">
      <title>Glass Effect Filter</title>
      <defs>
        <filter
          id={filterId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// Button Glass Filter Component
function ButtonGlassFilter() {
  const filterId = React.useId();

  return (
    <svg className="hidden">
      <title>Button Glass Effect Filter</title>
      <defs>
        <filter
          id={filterId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// Button variants configuration
const liquidButtonVariants = {
  variant: {
    default: "bg-transparent hover:scale-105 duration-300 transition text-slate-900 dark:text-slate-100",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/20",
    outline: "border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
    link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
  },
  size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 text-xs gap-1.5 px-4",
    lg: "h-10 rounded-md px-6",
    xl: "h-12 rounded-md px-8",
    xxl: "h-14 rounded-md px-10",
    icon: "h-9 w-9",
  },
};

// Liquid Glass Button Component
const LiquidButton = React.forwardRef(({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}, ref) => {
  const filterId = React.useId();

  return (
    <>
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "relative",
          // Apply variants
          liquidButtonVariants.variant[variant],
          liquidButtonVariants.size[size],
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
        
        <div
          className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
          style={{ backdropFilter: `url("#${filterId}")` }}
        />

        <div className="pointer-events-none z-10">{children}</div>
        <ButtonGlassFilter />
      </button>
    </>
  );
});

LiquidButton.displayName = "LiquidButton";

// Card variants configuration
const cardVariants = {
  variant: {
    default: "hover:scale-[1.01] text-slate-900 dark:text-slate-100 backdrop-blur-[2px]",
    primary: "bg-blue-500/5 hover:bg-blue-500/5 text-slate-900 dark:text-slate-100 backdrop-blur-[2px]",
    destructive: "bg-red-500/5 hover:bg-red-500/10 text-slate-900 dark:text-slate-100 backdrop-blur-[2px]",
    secondary: "bg-slate-500/5 hover:bg-slate-500/10 text-slate-900 dark:text-slate-100 backdrop-blur-[2px]",
  },
  size: {
    default: "p-6",
    sm: "p-4",
    lg: "p-8",
    xl: "p-10",
  },
  hover: {
    default: "hover:scale-[1.02]",
    none: "",
    glow: "hover:shadow-lg hover:shadow-blue-500/20",
  },
};

// Main Liquid Glass Card Component
const LiquidGlassCard = React.forwardRef(({
  className,
  variant = "default",
  size = "default",
  hover = "default",
  glassEffect = true,
  children,
  ...props
}, ref) => {
  const filterId = React.useId();

  return (
    <>
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative overflow-hidden rounded-lg transition-all duration-300 group bg-white/20 dark:bg-slate-800/20",
          // Apply variants
          cardVariants.variant[variant],
          cardVariants.size[size],
          cardVariants.hover[hover],
          className
        )}
        {...props}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 z-0 h-full w-full rounded-lg shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all pointer-events-none dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />

        {/* Glass filter effect */}
        {glassEffect && (
          <div
            className="absolute inset-0 -z-10 h-full w-full overflow-hidden rounded-lg"
            style={{ backdropFilter: `url("#${filterId}")` }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 z-20 rounded-lg bg-gradient-to-r from-transparent dark:via-white/5 via-black/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" />

        {glassEffect && <GlassFilter />}
      </div>
    </>
  );
});

LiquidGlassCard.displayName = "LiquidGlassCard";

export default LiquidGlassCard;
export { LiquidGlassCard, LiquidButton };
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { AnimatedCounter } from '@/components/shared/animated-counter';

export function WelcomeCard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 via-background to-ai-amber/5 border border-border p-6 md:p-8"
    >
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30">
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <circle cx="320" cy="60" r="80" fill="url(#grad1)" opacity="0.4" />
          <circle cx="380" cy="200" r="50" fill="url(#grad2)" opacity="0.3" />
          <circle cx="240" cy="240" r="30" fill="url(#grad1)" opacity="0.2" />
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.55 0.25 275)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.78 0.16 75)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-muted-foreground mb-1">Wednesday, March 18, 2026</p>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">{greeting}, Sarah.</h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          You have{' '}
          <span className="font-bold text-foreground">
            <AnimatedCounter value={12} />
          </span>{' '}
          new candidates today.{' '}
          <span className="font-bold text-foreground">
            <AnimatedCounter value={3} />
          </span>{' '}
          are{' '}
          <span className="inline-flex items-center gap-1">
            <span className="ai-shimmer font-bold" style={{ WebkitTextFillColor: 'transparent' }}>
              high-potential
            </span>
            <Sparkles className="w-3.5 h-3.5 text-ai-amber shrink-0" />
          </span>
        </p>
      </div>
    </motion.div>
  );
}

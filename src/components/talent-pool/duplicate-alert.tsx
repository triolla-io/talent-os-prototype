import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { AIShimmer } from '@/components/shared/ai-shimmer';

export function DuplicateAlert() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
        className="relative flex items-start gap-4 rounded-xl bg-warning/5 border border-warning/10 border-l-4 border-l-warning/40 p-4 shadow-sm"
      >
        <div className="shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="font-semibold text-foreground tracking-tight">Duplicate Candidates Detected</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-medium">2 candidates</strong> submitted by external agencies already exist in your
            talent pool. Estimated sourcing fee savings: <AIShimmer className="font-bold text-foreground inline-block">$12,000</AIShimmer>
          </p>
          <div className="pt-2">
            <Button variant="outline" size="sm" className="text-warning border-warning/30 hover:bg-warning/10 hover:text-warning">
              Review Duplicates
            </Button>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 rounded-md p-1 opacity-60 hover:opacity-100 hover:bg-warning/10 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4 text-warning" />
        </button>
      </motion.div>}
    </AnimatePresence>
  );
}

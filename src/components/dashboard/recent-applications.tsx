import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ScoreBadge } from '@/components/shared/score-badge';
import { Button } from '@/components/ui/button';
import { mockCandidates } from '@/lib/mocks/candidates';

const RECENT = mockCandidates.slice(0, 8);

export function RecentApplications() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base">Recent Applications</h2>
        <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline underline-offset-2">
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scroll container with fade-right edge */}
      <div className="relative">
        <div className="overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {RECENT.map((candidate, i) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}
                className="w-[188px] shrink-0 bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center gap-2.5 cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative">
                  <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full bg-muted" />
                  <div className="absolute -bottom-1 -right-1">
                    <ScoreBadge score={candidate.aiScore} size="sm" />
                  </div>
                </div>

                {/* Info */}
                <div className="w-full mt-1">
                  <p className="font-semibold text-sm truncate">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{candidate.role}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5">{candidate.source}</p>
                </div>

                {/* Action */}
                <Button variant="ghost" size="sm" className="w-full h-7 text-xs text-primary hover:text-primary hover:bg-primary/8">
                  Quick View
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fade right edge */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background to-transparent" />
      </div>
    </div>
  );
}

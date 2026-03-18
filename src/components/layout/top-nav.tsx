import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Bell, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TopNav() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-full items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0 mr-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-black">T</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-black tracking-tight text-foreground">Triolla</span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">Talent OS</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-xl relative">
          <motion.div
            animate={searchFocused ? { scale: 1.01 } : { scale: 1 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'flex items-center gap-2 h-9 rounded-xl border bg-muted/50 px-3 transition-all duration-200',
              searchFocused
                ? 'border-primary/40 shadow-[0_0_0_3px_oklch(0.55_0.25_275/0.12)] bg-card'
                : 'border-transparent hover:border-border hover:bg-muted/80',
            )}
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search candidates, jobs, or ask AI..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 text-foreground"
            />
            <AnimatePresence>
              {searchValue && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchValue('')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1.5 ml-auto shrink-0">
          {/* Ask AI button */}
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 h-8 px-3 hover:bg-ai-amber/10 group">
            <Sparkles className="w-3.5 h-3.5 text-ai-amber group-hover:scale-110 transition-transform" />
            <span className="ai-shimmer text-sm font-semibold">Ask AI</span>
          </Button>

          {/* Notification bell */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8 hover:bg-muted">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center leading-none">
              3
            </span>
          </Button>

          {/* Avatar */}
          <button className="flex items-center gap-1.5 h-8 rounded-lg px-1.5 hover:bg-muted transition-colors">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">SJ</span>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

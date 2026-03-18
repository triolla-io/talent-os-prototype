import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AIShimmer } from '@/components/shared/ai-shimmer';

const QUICK_CHIPS = ['Engineering', 'Product', 'Design', 'Sales', 'Marketing'];

const MOCK_JD = `## Job Title: Senior React Engineer

### About the Role
We are looking for an experienced Senior React Engineer to help build our next-generation talent platform. You will be instrumental in making technical decisions and creating a product that users love.

### Responsibilities
• Architect and develop scalable frontend systems
• Collaborate closely with design and product teams
• Mentor junior engineers and champion code quality
• Optimize application performance to ensure a snappy user experience

### Requirements
• 5+ years of experience with React, TypeScript, and modern CSS
• Deep understanding of web vitals and frontend performance
• Strong communication skills and a product-focused mindset
• Experience with UI component libraries and design systems

### Nice to Have
• Familiarity with Framer Motion or similar animation libraries
• Experience building SaaS platforms

### Compensation & Benefits
• $140K - $180K base salary
• Meaningful equity options
• Fully remote work with flexible hours
• Comprehensive health coverage`;

interface AIJDWriterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIJDWriter({ open, onOpenChange }: AIJDWriterProps) {
  const [step, setStep] = useState<'input' | 'generating' | 'done'>('input');
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep('input');
      setPrompt('');
      setGeneratedText('');
      setCopied(false);
    }
  }, [open]);

  // Typing effect logic
  useEffect(() => {
    if (step === 'generating') {
      let currentIndex = 0;
      setGeneratedText('');

      const interval = setInterval(() => {
        if (currentIndex < MOCK_JD.length) {
          const chunkSize = Math.floor(Math.random() * 3) + 2; // Write 2-4 characters per interval
          setGeneratedText((prev) => prev + MOCK_JD.substring(currentIndex, currentIndex + chunkSize));
          currentIndex += chunkSize;
        } else {
          clearInterval(interval);
          setStep('done');
        }
      }, 15);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setStep('generating');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl overflow-hidden flex flex-col max-h-[90vh] pb-8 outline-none focus:outline-none focus-visible:outline-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-ai-amber" />
            <AIShimmer>AI Job Description Writer</AIShimmer>
          </DialogTitle>
          <DialogDescription>
            Describe your ideal candidate, and our AI will draft a compelling job post targeting exceptional talent.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-2 pr-1 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 h-full pt-4"
              >
                <div className="flex flex-col flex-1">
                  <div className="relative group">
                    <Textarea
                      id="prompt"
                      placeholder="e.g., We need an outstanding Senior React developer with 5+ years of experience to lead our fintech frontend transition..."
                      className="min-h-[160px] max-h-[200px] overflow-y-auto resize-none p-5 text-base focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary border-2 border-border/60 bg-muted/10 shadow-sm rounded-2xl leading-relaxed transition-all pb-12"
                      value={prompt}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                    />
                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                      <Sparkles className="w-5 h-5 text-muted-foreground/40 group-focus-within:text-primary/40 transition-colors" />
                      <span className="text-[11px] text-muted-foreground/50 font-medium tracking-widest uppercase">AI Assistant</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Quick Add</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_CHIPS.map((chip) => (
                      <Badge
                        key={chip}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 text-secondary-foreground transition-colors"
                        onClick={() => setPrompt((prev) => (prev ? prev + ' ' + chip : chip))}
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 flex justify-end">
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group"
                  >
                    <span>Generate With AI</span>
                    <Sparkles className="w-4 h-4 ml-2 group-hover:text-ai-amber transition-colors" />
                  </Button>
                </div>
              </motion.div>
            )}

            {(step === 'generating' || step === 'done') && (
              <motion.div
                key="generating-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full"
              >
                {step === 'generating' && (
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-6 mt-1">
                    <motion.div
                      className="h-full w-full bg-linear-to-r from-ai-amber to-ai-coral"
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
                    />
                  </div>
                )}

                <div className="relative bg-muted/10 border rounded-lg p-5 flex-1 min-h-[350px] font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground shadow-inner">
                  {generatedText}
                  {step === 'generating' && <span className="typing-cursor" />}
                </div>

                <AnimatePresence>
                  {step === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex items-center justify-end gap-3"
                    >
                      <Button variant="outline" onClick={handleCopy} className="min-w-[140px]">
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy to Clipboard
                          </>
                        )}
                      </Button>
                      <Button onClick={() => onOpenChange(false)}>
                        <Sparkles className="w-4 h-4 mr-2 text-ai-amber" />
                        Use This Description
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

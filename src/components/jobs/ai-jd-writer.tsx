import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Copy, CheckCircle2, Wand2, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const QUICK_CHIPS = ['Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'Operations']

const MOCK_JD = `## Senior React Engineer

### About the Role
We are looking for an experienced Senior React Engineer to help build our next-generation talent platform. You will be instrumental in making technical decisions and creating a product that users love.

### Responsibilities
• Architect and develop scalable frontend systems
• Collaborate closely with design and product teams
• Mentor junior engineers and champion code quality
• Optimize application performance for a snappy user experience
• Drive technical excellence through rigorous code review

### Requirements
• 5+ years of experience with React, TypeScript, and modern CSS
• Deep understanding of web vitals and frontend performance
• Strong communication skills and a product-focused mindset
• Experience with UI component libraries and design systems
• Track record shipping products at scale

### Nice to Have
• Familiarity with Framer Motion or animation libraries
• Experience building SaaS platforms in fintech
• Contributions to open source projects

### Compensation & Benefits
• Meaningful equity from day one
• Fully remote with flexible hours
• Comprehensive health, dental & vision
• $2,000 annual learning budget`

interface AIJDWriterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AIJDWriter({ open, onOpenChange }: AIJDWriterProps) {
  const [step, setStep] = useState<'input' | 'generating' | 'done'>('input')
  const [prompt, setPrompt] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [copied, setCopied] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setStep('input')
      setPrompt('')
      setGeneratedText('')
      setCopied(false)
    }
  }, [open])

  useEffect(() => {
    if (step === 'generating') {
      let currentIndex = 0
      setGeneratedText('')

      const interval = setInterval(() => {
        if (currentIndex < MOCK_JD.length) {
          const chunkSize = Math.floor(Math.random() * 4) + 2
          setGeneratedText((prev) => prev + MOCK_JD.substring(currentIndex, currentIndex + chunkSize))
          currentIndex += chunkSize
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
          }
        } else {
          clearInterval(interval)
          setStep('done')
        }
      }, 12)

      return () => clearInterval(interval)
    }
  }, [step])

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setStep('generating')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'p-0 border-0 outline-none focus:outline-none focus-visible:outline-none',
          'bg-white sm:max-w-2xl overflow-hidden rounded-2xl flex flex-col max-h-[88vh]',
          '[&>button]:text-zinc-400 [&>button]:hover:text-zinc-700 [&>button]:z-50',
        )}
        style={{ boxShadow: '0 24px 80px -12px oklch(0 0 0 / 0.22), 0 0 0 1px oklch(0.92 0.004 260)' }}
      >
        {/* Header */}
        <div className="relative px-8 pt-7 pb-5 shrink-0 overflow-hidden">
          {/* Subtle ambient glow behind icon */}
          <div
            className="absolute -top-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, oklch(0.78 0.16 75 / 0.08), transparent 70%)' }}
          />

          <div className="flex items-center gap-3 mb-1.5 relative">
            {/* Animated icon */}
            <div className="relative shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.72 0.18 40))' }}
              >
                <motion.div
                  animate={step === 'generating' ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Wand2 className="w-[18px] h-[18px] text-white" strokeWidth={2} />
                </motion.div>
              </div>
              {step === 'generating' && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.72 0.18 40))' }}
                  animate={{ opacity: [0, 0.45, 0], scale: [1, 1.7, 1.7] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900">
                <span className="ai-shimmer">AI Job Description Writer</span>
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                {step === 'input'
                  ? 'Describe the role — our AI will craft a compelling job post.'
                  : step === 'generating'
                    ? 'Generating your job description…'
                    : 'Your job description is ready.'}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-100 mx-8 shrink-0" />

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {/* ── INPUT STEP ── */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-6 px-8 pt-6 pb-8 flex-1"
              >
                {/* Textarea with amber focus ring */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={
                      isFocused
                        ? { boxShadow: '0 0 0 2px oklch(0.78 0.16 75 / 0.45), 0 0 20px 0 oklch(0.78 0.16 75 / 0.1)' }
                        : { boxShadow: '0 0 0 0px transparent' }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <textarea
                    ref={textareaRef}
                    placeholder="e.g., Senior React developer to lead our fintech frontend — 5+ years, strong design instincts, passionate about performance…"
                    className={cn(
                      'w-full min-h-[160px] max-h-[200px] resize-none rounded-2xl',
                      'px-5 pt-5 pb-14 text-sm leading-relaxed text-zinc-800',
                      'bg-zinc-50 border border-zinc-200',
                      'placeholder:text-zinc-400',
                      'outline-none focus:outline-none ring-0 focus:ring-0',
                    )}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  <div className="absolute bottom-0 inset-x-0 h-12 rounded-b-2xl px-5 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'oklch(0.78 0.16 75)' }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-semibold">AI-powered</span>
                    </div>
                    <span className="text-[11px] text-zinc-300 tabular-nums">{prompt.length}</span>
                  </div>
                </div>

                {/* Quick chips */}
                <div className="space-y-2.5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-semibold">Quick select department</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_CHIPS.map((chip, i) => (
                      <motion.button
                        key={chip}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.25 }}
                        onClick={() => setPrompt((prev) => (prev ? `${prev} ${chip}` : chip))}
                        className={cn(
                          'px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
                          'text-zinc-600 border-zinc-200 bg-white',
                          'hover:border-amber-400/70 hover:text-amber-700 hover:bg-amber-50',
                          'active:scale-95',
                        )}
                      >
                        {chip}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Generate button */}
                <div className="flex justify-end mt-auto">
                  <motion.button
                    onClick={handleGenerate}
                    disabled={!prompt.trim()}
                    whileHover={prompt.trim() ? { scale: 1.02 } : {}}
                    whileTap={prompt.trim() ? { scale: 0.98 } : {}}
                    className={cn(
                      'relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold overflow-hidden',
                      'transition-all duration-300',
                      prompt.trim() ? 'text-white cursor-pointer' : 'text-zinc-400 bg-zinc-100 border border-zinc-200 cursor-not-allowed',
                    )}
                    style={
                      prompt.trim()
                        ? {
                            background: 'linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.68 0.22 50))',
                            boxShadow: '0 4px 16px oklch(0.78 0.16 75 / 0.38), inset 0 1px 0 oklch(1 0 0 / 0.15)',
                          }
                        : {}
                    }
                  >
                    {prompt.trim() && (
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(105deg, transparent 30%, oklch(1 0 0 / 0.09) 50%, transparent 70%)' }}
                        animate={{ x: ['-120%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                      />
                    )}
                    <Sparkles className="w-4 h-4 relative" />
                    <span className="relative">Generate with AI</span>
                    <ArrowRight className="w-3.5 h-3.5 relative" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── GENERATING / DONE STEP ── */}
            {(step === 'generating' || step === 'done') && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col flex-1 min-h-0 px-8 pt-5 pb-8 gap-4"
              >
                {/* Progress bar */}
                <AnimatePresence>
                  {step === 'generating' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="shrink-0 space-y-2">
                      <div className="h-0.5 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, oklch(0.78 0.16 75), oklch(0.72 0.18 40), oklch(0.78 0.16 75))',
                            backgroundSize: '200% 100%',
                          }}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%', backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                          transition={{
                            width: { duration: 3.5, ease: 'easeOut' },
                            backgroundPosition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[0, 0.2, 0.4].map((delay) => (
                          <motion.div
                            key={delay}
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: 'oklch(0.78 0.16 75)' }}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay }}
                          />
                        ))}
                        <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-semibold ml-1">Generating</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Document panel — light, clean */}
                <div
                  ref={scrollRef}
                  className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50/60"
                  style={{ boxShadow: 'inset 0 1px 4px oklch(0 0 0 / 0.04)' }}
                >
                  {/* Top bar */}
                  <div className="sticky top-0 flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <span className="ml-3 text-[10px] text-zinc-400 font-mono tracking-wider">job-description.md</span>
                    {step === 'done' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-auto flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-emerald-600 font-mono font-medium">complete</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Text */}
                  <pre className="p-5 text-sm leading-relaxed font-mono whitespace-pre-wrap wrap-break-word min-h-[260px] text-zinc-700">
                    {generatedText}
                    {step === 'generating' && <span className="typing-cursor" />}
                  </pre>
                </div>

                {/* Action buttons */}
                <AnimatePresence>
                  {step === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex items-center justify-between gap-3 shrink-0"
                    >
                      <p className="text-xs text-zinc-400 font-medium">✦ Generated by Triolla AI</p>
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={handleCopy}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                            'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 hover:border-zinc-300',
                            'active:scale-95',
                          )}
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>

                        <motion.button
                          onClick={() => onOpenChange(false)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.68 0.22 50))',
                            boxShadow: '0 4px 16px oklch(0.78 0.16 75 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.15)',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(105deg, transparent 30%, oklch(1 0 0 / 0.1) 50%, transparent 70%)' }}
                            animate={{ x: ['-120%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                          />
                          <Sparkles className="w-4 h-4 relative" />
                          <span className="relative">Use This Description</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

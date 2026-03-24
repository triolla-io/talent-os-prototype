import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  AlertTriangle,
  User,
  Briefcase,
  CheckCircle,
  Plus,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  UserPlus,
  Check,
  UploadCloud,
  FileText,
} from 'lucide-react'
import { mockCandidates } from '@/lib/mocks/candidates'
import { mockJobs } from '@/lib/mocks/jobs'
import type { PipelineStage } from '@/types'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  name: string
  email: string
  phone: string
  location: string
  role: string
  experienceMin: string
  experienceMax: string
  source: string
  status: PipelineStage
  skills: string[]
  notes: string
}

interface AddCandidateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStage?: PipelineStage
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EMPTY_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  role: '',
  experienceMin: '',
  experienceMax: '',
  source: '',
  status: 'new',
  skills: [],
  notes: '',
}

const YEARS_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '15', '20']

const SOURCE_OPTIONS = [
  'LinkedIn',
  'Referral',
  'Direct Application',
  'Agency - TechHunt',
  'Agency - TopTalent',
  'Agency - Other',
  'Indeed',
  'Other',
]

const STAGE_OPTIONS: { value: PipelineStage; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'screening', label: 'Screening' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' },
]

// Unique role titles from the jobs mock
const ROLE_OPTIONS = [...new Set(mockJobs.map((j) => j.title))].sort()

// ─── Field Label ─────────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-foreground mb-1.5">
      {children}
      {required && <span className="text-destructive ml-0.5">*</span>}
    </label>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AddCandidateModal({ open, onOpenChange, defaultStage = 'new' }: AddCandidateModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM, status: defaultStage })
  const [skillInput, setSkillInput] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [duplicateCandidate, setDuplicateCandidate] = useState<(typeof mockCandidates)[0] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setStep(1)
      setForm({ ...EMPTY_FORM, status: defaultStage })
      setSkillInput('')
      setResumeFile(null)
      setIsDragOver(false)
      setDuplicateCandidate(null)
    }
  }, [open, defaultStage])

  // Live duplicate detection on email
  useEffect(() => {
    if (form.email.length > 5) {
      const match = mockCandidates.find((c) => c.email.toLowerCase() === form.email.toLowerCase())
      setDuplicateCandidate(match ?? null)
    } else {
      setDuplicateCandidate(null)
    }
  }, [form.email])

  const update = (field: keyof FormData, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }))

  const addSkill = (raw: string) => {
    const trimmed = raw.trim()
    if (trimmed && !form.skills.includes(trimmed)) {
      update('skills', [...form.skills, trimmed])
    }
    setSkillInput('')
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (allowed.includes(file.type)) setResumeFile(file)
  }

  const expLabel =
    form.experienceMin && form.experienceMax
      ? `${form.experienceMin}–${form.experienceMax} years`
      : form.experienceMin
        ? `${form.experienceMin}+ years`
        : '—'

  const canGoStep2 = form.name.trim() !== '' && form.email.trim() !== ''
  const canGoStep3 = form.role !== '' && form.source !== ''

  const stepMeta = [
    { num: 1, label: 'Basic Info', icon: User },
    { num: 2, label: 'Professional', icon: Briefcase },
    { num: 3, label: 'Review', icon: CheckCircle },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0 overflow-hidden" showCloseButton={false}>
        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-base font-semibold">
              <UserPlus className="w-4 h-4 text-primary" />
              Add Candidate
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-1 mt-3">
            {stepMeta.map((s, i) => (
              <div key={s.num} className="flex items-center gap-1">
                <div
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium transition-colors',
                    step === s.num ? 'text-primary' : step > s.num ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground',
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                      step === s.num
                        ? 'bg-primary text-primary-foreground'
                        : step > s.num
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {step > s.num ? <Check className="w-3 h-3" /> : s.num}
                  </div>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < stepMeta.length - 1 && (
                  <div
                    className={cn('h-px w-6 mx-1 transition-colors', step > s.num ? 'bg-emerald-300 dark:bg-emerald-700' : 'bg-border')}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        {/* ── Body ── */}
        <div className="px-6 py-5 overflow-y-auto max-h-[58vh]">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Basic Info ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="space-y-5"
              >
                {/* Resume upload */}
                <div>
                  <FieldLabel>Resume</FieldLabel>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                  {resumeFile ? (
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium truncate flex-1">{resumeFile.name}</span>
                      <button
                        onClick={() => setResumeFile(null)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragOver(true)
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragOver(false)
                        handleFileChange(e.dataTransfer.files?.[0] ?? null)
                      }}
                      className={cn(
                        'w-full rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors',
                        isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30',
                      )}
                    >
                      <UploadCloud className="w-6 h-6 mx-auto mb-1.5 text-muted-foreground" />
                      <p className="text-sm font-medium text-foreground">Click to upload or drag & drop</p>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC, DOCX</p>
                    </button>
                  )}
                </div>

                {/* Duplicate detection alert */}
                <AnimatePresence>
                  {duplicateCandidate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-700/40 p-3">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-px shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Potential duplicate detected</p>
                          <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-0.5">
                            <span className="font-medium">{duplicateCandidate.name}</span> ({duplicateCandidate.role}) already exists via{' '}
                            {duplicateCandidate.source}.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FieldLabel required>Full Name</FieldLabel>
                    <Input placeholder="e.g. Sarah Johnson" value={form.name} onChange={(e) => update('name', e.target.value)} />
                  </div>

                  <div className="col-span-2">
                    <FieldLabel required>Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                      <Input
                        className="pl-8"
                        type="email"
                        placeholder="sarah@example.com"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Phone</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                      <Input
                        className="pl-8"
                        placeholder="+1-555-0100"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Location</FieldLabel>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                      <Input
                        className="pl-8"
                        placeholder="City, State or Remote"
                        value={form.location}
                        onChange={(e) => update('location', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Professional Details ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Role dropdown */}
                  <div className="col-span-2">
                    <FieldLabel required>Role / Position</FieldLabel>
                    <NativeSelect className="w-full" value={form.role} onChange={(e) => update('role', e.target.value)}>
                      <NativeSelectOption value="" disabled>
                        Select a role
                      </NativeSelectOption>
                      {ROLE_OPTIONS.map((r) => (
                        <NativeSelectOption key={r} value={r}>
                          {r}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  {/* Experience min / max */}
                  <div>
                    <FieldLabel>Min. Experience</FieldLabel>
                    <NativeSelect className="w-full" value={form.experienceMin} onChange={(e) => update('experienceMin', e.target.value)}>
                      <NativeSelectOption value="" disabled>
                        Years
                      </NativeSelectOption>
                      {YEARS_OPTIONS.map((y) => (
                        <NativeSelectOption key={y} value={y}>
                          {y} yr{y !== '1' ? 's' : ''}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  <div>
                    <FieldLabel>Max. Experience</FieldLabel>
                    <NativeSelect className="w-full" value={form.experienceMax} onChange={(e) => update('experienceMax', e.target.value)}>
                      <NativeSelectOption value="" disabled>
                        Years
                      </NativeSelectOption>
                      {YEARS_OPTIONS.map((y) => (
                        <NativeSelectOption key={y} value={y}>
                          {y} yr{y !== '1' ? 's' : ''}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  <div>
                    <FieldLabel required>Source</FieldLabel>
                    <NativeSelect className="w-full" value={form.source} onChange={(e) => update('source', e.target.value)}>
                      <NativeSelectOption value="" disabled>
                        How did they apply?
                      </NativeSelectOption>
                      {SOURCE_OPTIONS.map((o) => (
                        <NativeSelectOption key={o} value={o}>
                          {o}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  {/* Hiring flow stage */}
                  <div>
                    <FieldLabel>Hiring Flow Stage</FieldLabel>
                    <NativeSelect
                      className="w-full"
                      value={form.status}
                      onChange={(e) => update('status', e.target.value as PipelineStage)}
                    >
                      {STAGE_OPTIONS.map((o) => (
                        <NativeSelectOption key={o.value} value={o.value}>
                          {o.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  {/* Skills tag input */}
                  <div className="col-span-2">
                    <FieldLabel>Skills</FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a skill and press Enter"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addSkill(skillInput)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 px-0 shrink-0"
                        onClick={() => addSkill(skillInput)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {form.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {form.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-1 pr-1 text-xs">
                            {skill}
                            <button
                              onClick={() =>
                                update(
                                  'skills',
                                  form.skills.filter((s) => s !== skill),
                                )
                              }
                              className="hover:text-destructive transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <FieldLabel>Notes</FieldLabel>
                    <Textarea
                      placeholder="Any initial notes or context about this candidate..."
                      className="resize-none text-sm min-h-[76px]"
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Review ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="rounded-xl border border-border/60 bg-card p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {form.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold leading-tight">{form.name || '—'}</p>
                      <p className="text-sm text-muted-foreground">{form.role || '—'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                    {[
                      { label: 'Email', value: form.email },
                      { label: 'Phone', value: form.phone },
                      { label: 'Location', value: form.location },
                      { label: 'Experience', value: expLabel },
                      { label: 'Source', value: form.source },
                      { label: 'Hiring Flow Stage', value: STAGE_OPTIONS.find((s) => s.value === form.status)?.label ?? form.status },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="font-medium truncate">{value || '—'}</p>
                      </div>
                    ))}
                  </div>

                  {resumeFile && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Resume</p>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-medium truncate">{resumeFile.name}</span>
                      </div>
                    </div>
                  )}

                  {form.skills.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {form.skills.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {form.notes && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Notes</p>
                      <p className="text-sm">{form.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-border/50 bg-muted/30 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={() => (step > 1 ? setStep((s) => s - 1) : onOpenChange(false))}>
            {step > 1 ? 'Back' : 'Cancel'}
          </Button>

          {step < 3 ? (
            <Button size="sm" onClick={() => setStep((s) => s + 1)} disabled={step === 1 ? !canGoStep2 : !canGoStep3}>
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={() => onOpenChange(false)} className="gap-1.5">
              <CheckCircle className="w-4 h-4" />
              Add to Talent Pool
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

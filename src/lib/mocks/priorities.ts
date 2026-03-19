import type { Priority, AIInsight } from '../../types'

export const mockPriorities: Priority[] = [
  {
    id: '1',
    text: 'Review 3 strong Senior PM candidates — AI score 88+',
    type: 'review',
    urgency: 'high',
    relatedCount: 3,
    completed: false,
  },
  {
    id: '2',
    text: "Follow up with 8 candidates from last week's screening",
    type: 'follow-up',
    urgency: 'medium',
    relatedCount: 8,
    completed: false,
  },
  {
    id: '3',
    text: 'New job description ready for "Head of Sales" — review before posting',
    type: 'ai-suggestion',
    urgency: 'low',
    completed: false,
  },
  {
    id: '4',
    text: 'Schedule 2 final interviews for Frontend Engineer role',
    type: 'action',
    urgency: 'medium',
    relatedCount: 2,
    completed: false,
  },
  {
    id: '5',
    text: 'Review AI screening results for DevOps Lead applicants',
    type: 'review',
    urgency: 'high',
    relatedCount: 12,
    completed: false,
  },
]

export const mockInsights: AIInsight[] = [
  {
    id: '1',
    text: '3 candidates in your Talent Pool are likely to respond to outreach this week based on their activity patterns',
    type: 'prediction',
    confidence: 84,
  },
  {
    id: '2',
    text: 'Your screening-to-interview conversion rate is 15% above industry average this quarter',
    type: 'recommendation',
    confidence: 92,
  },
  {
    id: '3',
    text: '2 candidates from TechHunt Agency are duplicates already in your database — estimated savings of $12,000 in sourcing fees',
    type: 'alert',
    confidence: 99,
  },
]

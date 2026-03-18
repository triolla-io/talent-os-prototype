// src/types/index.ts

export type PageId = "dashboard" | "pipeline" | "talent-pool" | "jobs" | "ai-agents" | "reports";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  aiScore: number;
  source: string;
  appliedDate: string;
  status: PipelineStage;
  skills: string[];
  experience: string;
  location: string;
  isDuplicate?: boolean;
  duplicateSource?: string;
  notes?: string;
}

export type PipelineStage = "new" | "screening" | "interview" | "offer" | "hired" | "rejected";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  status: "active" | "draft" | "closed" | "paused";
  candidateCount: number;
  postedDate: string;
  description?: string;
  requirements?: string[];
  salaryRange?: string;
  hiringManager: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "idle";
  icon: string;
  lastActivity: string;
  processedToday: number;
  successRate: number;
  activities: AgentActivity[];
}

export interface AgentActivity {
  id: string;
  agentId: string;
  action: string;
  target: string;
  timestamp: string;
  status: "completed" | "in-progress" | "failed";
}

export interface DashboardMetrics {
  activeRoles: number;
  candidatesInPipeline: number;
  monthlyHires: number;
  aiConfidenceScore: number;
}

export interface Priority {
  id: string;
  text: string;
  type: "review" | "follow-up" | "action" | "ai-suggestion";
  urgency: "high" | "medium" | "low";
  relatedCount?: number;
  completed: boolean;
}

export interface AIInsight {
  id: string;
  text: string;
  type: "prediction" | "recommendation" | "alert";
  confidence: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

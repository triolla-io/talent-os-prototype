import { cn } from '@/lib/utils';

interface AIShimmerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

export function AIShimmer({ children, className, as: Tag = 'span' }: AIShimmerProps) {
  return <Tag className={cn('ai-shimmer font-semibold', className)}>{children}</Tag>;
}

interface AIGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AIGlowCard({ children, className }: AIGlowCardProps) {
  return <div className={cn('ai-glow-border rounded-xl', className)}>{children}</div>;
}

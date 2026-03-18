import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const count = useAnimatedCounter(value, duration);
  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}{count}{suffix}
    </span>
  );
}

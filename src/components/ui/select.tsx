import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 rounded-md border border-github-border bg-[#0d1117] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-github-blue',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export function BackLink({ to, children, className }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 text-sm text-github-blue transition-colors hover:underline',
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" />
      {children}
    </Link>
  );
}

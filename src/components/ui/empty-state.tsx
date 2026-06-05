import { Inbox } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
        <Inbox className="h-10 w-10 text-github-muted" />
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-github-muted">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

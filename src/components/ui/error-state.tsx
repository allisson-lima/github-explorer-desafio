import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({
  title = 'Algo deu errado',
  message,
}: ErrorStateProps) {
  return (
    <Card className="border-red-900/50">
      <CardContent className="flex items-start gap-3 p-6">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div>
          <h3 className="font-semibold text-red-300">{title}</h3>
          <p className="mt-1 text-sm text-github-muted">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}

import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  title?: string;
  message: string;
  statusCode?: number;
  apiMessage?: string;
}

export function ErrorState({
  title = 'Algo deu errado',
  message,
  statusCode,
  apiMessage,
}: ErrorStateProps) {
  return (
    <Card className="border-red-900/50">
      <CardContent className="flex items-start gap-3 p-6">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-red-300">{title}</h3>
            {statusCode !== undefined && (
              <Badge
                variant="outline"
                className="border-red-900/50 text-xs text-red-300"
              >
                HTTP {statusCode}
              </Badge>
            )}
          </div>
          <p className="text-sm text-github-muted">{message}</p>
          {apiMessage && (
            <p className="text-xs text-github-muted">
              Mensagem:{' '}
              <span className="font-mono text-red-300/80">{apiMessage}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

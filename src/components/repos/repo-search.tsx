import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RepoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function RepoSearch({ value, onChange }: RepoSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [localValue, value, onChange]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-github-muted" />
      <Input
        id="repo-search"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        placeholder="Buscar repositório por nome, descrição ou linguagem..."
        className="pl-9 pr-10"
        aria-label="Buscar repositório"
      />
      {localValue && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
          onClick={() => {
            setLocalValue('');
            onChange('');
          }}
          aria-label="Limpar busca"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

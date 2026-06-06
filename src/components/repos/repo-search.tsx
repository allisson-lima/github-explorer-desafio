import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DEBOUNCE_MS = 300;

interface RepoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function RepoSearch({ value, onChange }: RepoSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const [prevExternalValue, setPrevExternalValue] = useState(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  if (value !== prevExternalValue) {
    setPrevExternalValue(value);
    setLocalValue(value);
  }

  useEffect(() => {
    if (localValue === value) {
      return;
    }

    const timer = window.setTimeout(() => {
      onChangeRef.current(localValue);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [localValue, value]);

  const handleClear = () => {
    setLocalValue('');
    onChangeRef.current('');
  };

  return (
    <div role="search" className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-github-muted"
        aria-hidden="true"
      />
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
          onClick={handleClear}
          aria-label="Limpar busca"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchSchema, type SearchFormData } from '@/schemas/search-schema';
import { useSearchStore } from '@/stores/search-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  variant?: 'default' | 'compact';
  inputId?: string;
  className?: string;
}

export function SearchForm({
  variant = 'default',
  inputId = 'username',
  className,
}: SearchFormProps) {
  const navigate = useNavigate();
  const { username: currentUsername } = useParams();
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const isCompact = variant === 'compact';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { username: '' },
  });

  useEffect(() => {
    if (isCompact && currentUsername) {
      reset({ username: currentUsername });
    }
  }, [currentUsername, isCompact, reset]);

  const onSubmit = ({ username }: SearchFormData) => {
    const normalized = username.trim();
    addRecentSearch(normalized);
    navigate(`/user/${normalized}`);

    if (!isCompact) {
      reset({ username: '' });
    }
  };

  const errorId = `${inputId}-error`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(isCompact ? 'w-full' : 'space-y-3', className)}
    >
      <div
        className={cn(
          'flex gap-2',
          isCompact ? 'flex-row items-center' : 'flex-col sm:flex-row sm:gap-3',
        )}
      >
        <div className="min-w-0 flex-1">
          <label htmlFor={inputId} className="sr-only">
            Usuário do GitHub
          </label>
          <Input
            id={inputId}
            placeholder={
              isCompact
                ? 'Buscar usuário...'
                : 'Digite um usuário do GitHub (ex: octocat)'
            }
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? errorId : undefined}
            className={cn(isCompact && 'h-9 text-sm')}
            {...register('username')}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          size={isCompact ? 'sm' : 'md'}
          className={cn(
            isCompact ? 'shrink-0 px-3' : 'sm:min-w-32',
            !isCompact && 'w-full sm:w-auto',
          )}
          aria-label="Buscar usuário"
        >
          <Search className="h-4 w-4" />
          <span className={cn(isCompact && 'hidden sm:inline')}>Buscar</span>
        </Button>
      </div>
      {errors.username && (
        <p
          id={errorId}
          className={cn(
            'text-red-400',
            isCompact ? 'mt-1.5 text-xs' : 'text-sm',
          )}
        >
          {errors.username.message}
        </p>
      )}
    </form>
  );
}

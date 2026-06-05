import { parseAsStringEnum, useQueryState } from 'nuqs';
import type { GitHubRepo, RepoSortField, SortOrder } from '@/types/repo';
import { sortRepos } from '@/utils/sort-repos';
import { RepoCard } from '@/components/repos/repo-card';
import { RepoSortSelect } from '@/components/repos/repo-sort-select';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';

interface RepoListProps {
  repos: GitHubRepo[];
  isLoading?: boolean;
}

export function RepoList({ repos, isLoading }: RepoListProps) {
  const [sort] = useQueryState(
    'sort',
    parseAsStringEnum<RepoSortField>([
      'stars',
      'name',
      'updated',
      'forks',
    ]).withDefault('stars'),
  );

  const [order] = useQueryState(
    'order',
    parseAsStringEnum<SortOrder>(['asc', 'desc']).withDefault('desc'),
  );

  const sortedRepos = sortRepos(repos, sort, order);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-lg font-semibold">
          Repositórios ({sortedRepos.length})
        </h2>
        <RepoSortSelect />
      </div>

      {sortedRepos.length === 0 ? (
        <EmptyState
          title="Nenhum repositório encontrado"
          description="Este usuário não possui repositórios públicos."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sortedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}

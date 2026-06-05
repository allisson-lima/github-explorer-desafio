import { useRepoListState } from '@/hooks/use-repo-list-state';
import type { GitHubRepo } from '@/types/repo';
import { RepoCard } from '@/components/repos/repo-card';
import { RepoPagination } from '@/components/repos/repo-pagination';
import { RepoSearch } from '@/components/repos/repo-search';
import { RepoSortSelect } from '@/components/repos/repo-sort-select';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';

interface RepoListProps {
  repos: GitHubRepo[];
  isLoading?: boolean;
}

export function RepoList({ repos, isLoading }: RepoListProps) {
  const {
    search,
    currentPage,
    normalizedPerPage,
    totalPages,
    filteredRepos,
    sortedRepos,
    paginatedRepos,
    handleSearchChange,
    handlePerPageChange,
    handlePageChange,
  } = useRepoListState(repos);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36" />
          ))}
        </div>
      </div>
    );
  }

  const hasSearch = search.trim().length > 0;
  const totalLabel = hasSearch
    ? `${sortedRepos.length} de ${repos.length}`
    : `${repos.length}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <h2 className="text-lg font-semibold">Repositórios ({totalLabel})</h2>
        <RepoSortSelect />
      </div>

      <RepoSearch key={search} value={search} onChange={handleSearchChange} />

      {repos.length === 0 ? (
        <EmptyState
          title="Nenhum repositório encontrado"
          description="Este usuário não possui repositórios públicos."
        />
      ) : filteredRepos.length === 0 ? (
        <EmptyState
          title="Nenhum resultado"
          description={`Nenhum repositório encontrado para "${search.trim()}".`}
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {paginatedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          <RepoPagination
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={normalizedPerPage}
            totalItems={sortedRepos.length}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        </>
      )}
    </div>
  );
}

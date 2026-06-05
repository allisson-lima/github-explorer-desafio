import type { GitHubRepo, RepoSortField, SortOrder } from '@/types/repo';

function getSortValue(repo: GitHubRepo, field: RepoSortField): string | number {
  switch (field) {
    case 'stars':
      return repo.stargazers_count;
    case 'forks':
      return repo.forks_count;
    case 'name':
      return repo.name.toLowerCase();
    case 'updated':
      return new Date(repo.updated_at).getTime();
    default:
      return repo.stargazers_count;
  }
}

export function sortRepos(
  repos: GitHubRepo[],
  sort: RepoSortField,
  order: SortOrder,
): GitHubRepo[] {
  return [...repos].sort((a, b) => {
    const valueA = getSortValue(a, sort);
    const valueB = getSortValue(b, sort);

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }

    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });
}

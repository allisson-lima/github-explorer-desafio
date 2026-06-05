import type { GitHubRepo } from '@/types/repo';

export function filterRepos(repos: GitHubRepo[], query: string): GitHubRepo[] {
  const term = query.trim().toLowerCase();

  if (!term) {
    return repos;
  }

  return repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(term) ||
      repo.description?.toLowerCase().includes(term) ||
      repo.language?.toLowerCase().includes(term),
  );
}

export function getTotalPages(totalItems: number, perPage: number): number {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function paginateRepos<T>(
  items: T[],
  page: number,
  perPage: number,
): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

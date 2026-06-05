import { useEffect, useMemo } from 'react';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';
import {
  DEFAULT_REPO_PER_PAGE,
  normalizeRepoPerPage,
} from '@/constants/repo-pagination';
import type { GitHubRepo, RepoSortField, SortOrder } from '@/types/repo';
import {
  filterRepos,
  getTotalPages,
  paginateRepos,
} from '@/utils/filter-repos';
import { sortRepos } from '@/utils/sort-repos';

export function useRepoListState(repos: GitHubRepo[]) {
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

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(DEFAULT_REPO_PER_PAGE),
  );

  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  const normalizedPerPage = normalizeRepoPerPage(perPage);

  const filteredRepos = useMemo(
    () => filterRepos(repos, search),
    [repos, search],
  );

  const sortedRepos = useMemo(
    () => sortRepos(filteredRepos, sort, order),
    [filteredRepos, sort, order],
  );

  const totalPages = getTotalPages(sortedRepos.length, normalizedPerPage);
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const paginatedRepos = useMemo(
    () => paginateRepos(sortedRepos, currentPage, normalizedPerPage),
    [sortedRepos, currentPage, normalizedPerPage],
  );

  useEffect(() => {
    if (page !== currentPage) {
      void setPage(currentPage);
    }
  }, [page, currentPage, setPage]);

  const resetPage = () => {
    void setPage(1);
  };

  const handleSearchChange = (value: string) => {
    void setSearch(value || null);
    resetPage();
  };

  const handlePerPageChange = (value: number) => {
    void setPerPage(normalizeRepoPerPage(value));
    resetPage();
  };

  const handlePageChange = (nextPage: number) => {
    void setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return {
    sort,
    order,
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
  };
}

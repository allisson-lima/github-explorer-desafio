export const REPO_PER_PAGE_OPTIONS = [6, 10, 20, 50] as const;

export type RepoPerPage = (typeof REPO_PER_PAGE_OPTIONS)[number];

export const DEFAULT_REPO_PER_PAGE: RepoPerPage = 10;

export function normalizeRepoPerPage(value: number): RepoPerPage {
  return REPO_PER_PAGE_OPTIONS.includes(value as RepoPerPage)
    ? (value as RepoPerPage)
    : DEFAULT_REPO_PER_PAGE;
}

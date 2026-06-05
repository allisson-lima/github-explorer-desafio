import { z } from 'zod';
import { githubRepoSchema } from '@/schemas/repo-schema';

export type GitHubRepo = z.infer<typeof githubRepoSchema>;

export type RepoSortField = 'stars' | 'name' | 'updated' | 'forks';
export type SortOrder = 'asc' | 'desc';

export interface RepoSortOptions {
  sort: RepoSortField;
  order: SortOrder;
}

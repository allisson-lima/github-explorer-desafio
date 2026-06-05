import { api } from '@/services/api';
import { githubRepoSchema } from '@/schemas/repo-schema';
import { githubUserSchema } from '@/schemas/user-schema';
import type { GitHubRepo } from '@/types/repo';
import type { GitHubUser } from '@/types/user';

const PER_PAGE = 100;

export async function getUser(username: string): Promise<GitHubUser> {
  const { data } = await api.get(`/users/${username}`);
  return githubUserSchema.parse(data);
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const { data } = await api.get(`/users/${username}/repos`, {
      params: {
        per_page: PER_PAGE,
        page,
        type: 'owner',
        sort: 'updated',
      },
    });

    const parsed = githubRepoSchema.array().parse(data);
    repos.push(...parsed);

    if (parsed.length < PER_PAGE) {
      break;
    }

    page += 1;
  }

  return repos;
}

export async function getRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo> {
  const { data } = await api.get(`/repos/${owner}/${repo}`);
  return githubRepoSchema.parse(data);
}

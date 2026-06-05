import type { GitHubRepo } from '@/types/repo';
import type { GitHubUser } from '@/types/user';

export function createMockUser(
  overrides: Partial<GitHubUser> = {},
): GitHubUser {
  return {
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231',
    bio: 'GitHub mascot',
    followers: 9000,
    following: 9,
    email: 'octocat@github.com',
    public_repos: 8,
    html_url: 'https://github.com/octocat',
    name: 'The Octocat',
    ...overrides,
  };
}

export function createMockRepo(
  overrides: Partial<GitHubRepo> = {},
): GitHubRepo {
  return {
    id: 1,
    name: 'Hello-World',
    full_name: 'octocat/Hello-World',
    description: 'My first repository on GitHub!',
    stargazers_count: 100,
    language: 'TypeScript',
    html_url: 'https://github.com/octocat/Hello-World',
    forks_count: 20,
    updated_at: '2024-01-15T10:00:00Z',
    owner: { login: 'octocat' },
    ...overrides,
  };
}

export function createMockRepos(count: number): GitHubRepo[] {
  return Array.from({ length: count }, (_, index) =>
    createMockRepo({
      id: index + 1,
      name: `repo-${index + 1}`,
      full_name: `octocat/repo-${index + 1}`,
      stargazers_count: count - index,
      forks_count: index,
      updated_at: new Date(2024, 0, count - index).toISOString(),
    }),
  );
}

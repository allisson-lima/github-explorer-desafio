import MockAdapter from 'axios-mock-adapter';
import { api } from './api';
import { getUser, getRepo, getUserRepos } from './github-service';
import {
  GitHubApiError,
  GitHubNotFoundError,
  GitHubRateLimitError,
} from '@/types/errors';
import { createMockRepo, createMockUser } from '@/test/mocks/github';

describe('api interceptors', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it('deve mapear 404 para GitHubNotFoundError com recurso user', async () => {
    mock.onGet('/users/ghost').reply(404, { message: 'Not Found' });

    await expect(api.get('/users/ghost')).rejects.toBeInstanceOf(
      GitHubNotFoundError,
    );

    try {
      await api.get('/users/ghost');
    } catch (error) {
      expect(error).toBeInstanceOf(GitHubNotFoundError);
      if (error instanceof GitHubNotFoundError) {
        expect(error.resource).toBe('user');
        expect(error.resourceId).toBe('ghost');
        expect(error.statusCode).toBe(404);
      }
    }
  });

  it('deve mapear 404 para GitHubNotFoundError com recurso repo', async () => {
    mock.onGet('/repos/octocat/missing').reply(404, { message: 'Not Found' });

    try {
      await api.get('/repos/octocat/missing');
    } catch (error) {
      expect(error).toBeInstanceOf(GitHubNotFoundError);
      if (error instanceof GitHubNotFoundError) {
        expect(error.resource).toBe('repo');
        expect(error.resourceId).toBe('octocat/missing');
      }
    }
  });

  it('deve mapear 403 para GitHubRateLimitError', async () => {
    mock
      .onGet('/users/octocat')
      .reply(403, { message: 'API rate limit exceeded' });

    await expect(api.get('/users/octocat')).rejects.toBeInstanceOf(
      GitHubRateLimitError,
    );
  });

  it('deve mapear outros status para GitHubApiError', async () => {
    mock
      .onGet('/users/octocat')
      .reply(500, { message: 'Internal Server Error' });

    try {
      await api.get('/users/octocat');
    } catch (error) {
      expect(error).toBeInstanceOf(GitHubApiError);
      if (error instanceof GitHubApiError) {
        expect(error.statusCode).toBe(500);
        expect(error.apiMessage).toBe('Internal Server Error');
      }
    }
  });
});

describe('github-service', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it('deve buscar e validar usuário', async () => {
    const user = createMockUser();
    mock.onGet('/users/octocat').reply(200, user);

    await expect(getUser('octocat')).resolves.toEqual(user);
  });

  it('deve buscar e validar repositório', async () => {
    const repo = createMockRepo();
    mock.onGet('/repos/octocat/Hello-World').reply(200, repo);

    await expect(getRepo('octocat', 'Hello-World')).resolves.toEqual(repo);
  });

  it('deve paginar repositórios até receber menos de 100 itens', async () => {
    const firstPage = Array.from({ length: 100 }, (_, index) =>
      createMockRepo({
        id: index + 1,
        name: `repo-${index + 1}`,
        full_name: `octocat/repo-${index + 1}`,
      }),
    );
    const secondPage = [
      createMockRepo({
        id: 101,
        name: 'repo-101',
        full_name: 'octocat/repo-101',
      }),
    ];

    mock
      .onGet('/users/octocat/repos', {
        params: { per_page: 100, page: 1, type: 'owner', sort: 'updated' },
      })
      .reply(200, firstPage);
    mock
      .onGet('/users/octocat/repos', {
        params: { per_page: 100, page: 2, type: 'owner', sort: 'updated' },
      })
      .reply(200, secondPage);

    const repos = await getUserRepos('octocat');
    expect(repos).toHaveLength(101);
  });
});

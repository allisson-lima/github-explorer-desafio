import { createMockRepo } from '@/test/mocks/github';
import { sortRepos } from './sort-repos';

describe('sortRepos', () => {
  const repos = [
    createMockRepo({
      id: 1,
      name: 'charlie',
      stargazers_count: 10,
      forks_count: 1,
      updated_at: '2024-01-01T00:00:00Z',
    }),
    createMockRepo({
      id: 2,
      name: 'alpha',
      stargazers_count: 50,
      forks_count: 5,
      updated_at: '2024-03-01T00:00:00Z',
    }),
    createMockRepo({
      id: 3,
      name: 'bravo',
      stargazers_count: 30,
      forks_count: 3,
      updated_at: '2024-02-01T00:00:00Z',
    }),
  ];

  it('não deve mutar o array original', () => {
    const original = [...repos];
    sortRepos(repos, 'stars', 'desc');
    expect(repos).toEqual(original);
  });

  it('deve ordenar por estrelas em ordem decrescente', () => {
    const sorted = sortRepos(repos, 'stars', 'desc');
    expect(sorted.map((repo) => repo.name)).toEqual([
      'alpha',
      'bravo',
      'charlie',
    ]);
  });

  it('deve ordenar por estrelas em ordem crescente', () => {
    const sorted = sortRepos(repos, 'stars', 'asc');
    expect(sorted.map((repo) => repo.name)).toEqual([
      'charlie',
      'bravo',
      'alpha',
    ]);
  });

  it('deve ordenar por nome', () => {
    const sorted = sortRepos(repos, 'name', 'asc');
    expect(sorted.map((repo) => repo.name)).toEqual([
      'alpha',
      'bravo',
      'charlie',
    ]);
  });

  it('deve ordenar por forks', () => {
    const sorted = sortRepos(repos, 'forks', 'desc');
    expect(sorted.map((repo) => repo.name)).toEqual([
      'alpha',
      'bravo',
      'charlie',
    ]);
  });

  it('deve ordenar por data de atualização', () => {
    const sorted = sortRepos(repos, 'updated', 'desc');
    expect(sorted.map((repo) => repo.name)).toEqual([
      'alpha',
      'bravo',
      'charlie',
    ]);
  });
});

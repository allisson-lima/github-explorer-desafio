import { createMockRepo } from '@/test/mocks/github';
import {
  filterRepos,
  getPaginationRange,
  getTotalPages,
  paginateRepos,
} from './filter-repos';

describe('filterRepos', () => {
  const repos = [
    createMockRepo({
      name: 'react-app',
      description: 'A React application',
      language: 'JavaScript',
    }),
    createMockRepo({
      id: 2,
      name: 'vue-app',
      description: 'A Vue application',
      language: 'TypeScript',
    }),
    createMockRepo({
      id: 3,
      name: 'docs',
      description: 'Project documentation',
      language: null,
    }),
  ];

  it('deve retornar todos os repositórios quando a busca estiver vazia', () => {
    expect(filterRepos(repos, '')).toEqual(repos);
    expect(filterRepos(repos, '   ')).toEqual(repos);
  });

  it('deve filtrar por nome', () => {
    expect(filterRepos(repos, 'react')).toHaveLength(1);
    expect(filterRepos(repos, 'react')[0].name).toBe('react-app');
  });

  it('deve filtrar por descrição', () => {
    expect(filterRepos(repos, 'documentation')).toHaveLength(1);
    expect(filterRepos(repos, 'documentation')[0].name).toBe('docs');
  });

  it('deve filtrar por linguagem', () => {
    expect(filterRepos(repos, 'typescript')).toHaveLength(1);
    expect(filterRepos(repos, 'typescript')[0].name).toBe('vue-app');
  });

  it('deve ser case insensitive', () => {
    expect(filterRepos(repos, 'REACT')).toHaveLength(1);
  });
});

describe('getTotalPages', () => {
  it('deve retornar no mínimo 1 página', () => {
    expect(getTotalPages(0, 10)).toBe(1);
  });

  it('deve calcular o total de páginas corretamente', () => {
    expect(getTotalPages(25, 10)).toBe(3);
    expect(getTotalPages(20, 10)).toBe(2);
  });
});

describe('paginateRepos', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('deve retornar os itens da página solicitada', () => {
    expect(paginateRepos(items, 1, 3)).toEqual([1, 2, 3]);
    expect(paginateRepos(items, 2, 3)).toEqual([4, 5, 6]);
    expect(paginateRepos(items, 4, 3)).toEqual([10]);
  });
});

describe('getPaginationRange', () => {
  it('deve retornar todas as páginas quando totalPages <= 7', () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('deve retornar páginas condensadas quando totalPages > 7', () => {
    const range = getPaginationRange(5, 10);
    expect(range).toContain(1);
    expect(range).toContain(10);
    expect(range).toContain(5);
    expect(range).toContain(4);
    expect(range).toContain(6);
    expect(range.every((page) => page >= 1 && page <= 10)).toBe(true);
  });
});

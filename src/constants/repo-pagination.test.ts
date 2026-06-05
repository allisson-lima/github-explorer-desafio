import { DEFAULT_REPO_PER_PAGE, normalizeRepoPerPage } from './repo-pagination';

describe('normalizeRepoPerPage', () => {
  it('deve aceitar valores válidos', () => {
    expect(normalizeRepoPerPage(6)).toBe(6);
    expect(normalizeRepoPerPage(10)).toBe(10);
    expect(normalizeRepoPerPage(20)).toBe(20);
    expect(normalizeRepoPerPage(50)).toBe(50);
  });

  it('deve retornar o valor padrão para valores inválidos', () => {
    expect(normalizeRepoPerPage(15)).toBe(DEFAULT_REPO_PER_PAGE);
    expect(normalizeRepoPerPage(100)).toBe(DEFAULT_REPO_PER_PAGE);
  });
});

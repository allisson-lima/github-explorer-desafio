import { screen } from '@testing-library/react';
import { RepoDetails } from './repo-details';
import { renderWithProviders } from '@/test/test-utils';
import { createMockRepo } from '@/test/mocks/github';

describe('RepoDetails', () => {
  it('deve renderizar nome e descrição do repositório', () => {
    const repo = createMockRepo();
    renderWithProviders(<RepoDetails repo={repo} />);

    expect(screen.getByText('octocat/Hello-World')).toBeInTheDocument();
    expect(
      screen.getByText('My first repository on GitHub!'),
    ).toBeInTheDocument();
  });

  it('deve exibir fallback quando descrição for null', () => {
    renderWithProviders(
      <RepoDetails repo={createMockRepo({ description: null })} />,
    );
    expect(screen.getByText('Sem descrição disponível.')).toBeInTheDocument();
  });

  it('deve renderizar link externo para o GitHub', () => {
    const repo = createMockRepo();
    renderWithProviders(<RepoDetails repo={repo} />);

    const link = screen.getByRole('link', { name: /Ver no GitHub/i });
    expect(link).toHaveAttribute('href', repo.html_url);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('deve renderizar link de voltar para o perfil do usuário', () => {
    renderWithProviders(<RepoDetails repo={createMockRepo()} />);
    expect(
      screen.getByRole('link', { name: /Voltar para @octocat/i }),
    ).toHaveAttribute('href', '/user/octocat');
  });
});

import { screen } from '@testing-library/react';
import { RepoCard } from './repo-card';
import { renderWithProviders } from '@/test/test-utils';
import { createMockRepo } from '@/test/mocks/github';

describe('RepoCard', () => {
  it('deve renderizar link para a página do repositório', () => {
    const repo = createMockRepo();
    renderWithProviders(<RepoCard repo={repo} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/repo/octocat/Hello-World');
  });

  it('deve exibir nome, descrição e badges', () => {
    const repo = createMockRepo();
    renderWithProviders(<RepoCard repo={repo} />);

    expect(screen.getByText('Hello-World')).toBeInTheDocument();
    expect(
      screen.getByText('My first repository on GitHub!'),
    ).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});

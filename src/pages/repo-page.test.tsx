import { screen } from '@testing-library/react';
import { RepoPage } from './RepoPage';
import { renderWithProviders } from '@/test/test-utils';
import { createMockRepo } from '@/test/mocks/github';
import { GitHubNotFoundError } from '@/types/errors';

const mockUseGitHubRepo = vi.fn();

vi.mock('@/hooks/use-github-repo', () => ({
  useGitHubRepo: (...args: unknown[]) => mockUseGitHubRepo(...args),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ owner: 'octocat', repoName: 'Hello-World' }),
  };
});

describe('RepoPage', () => {
  beforeEach(() => {
    mockUseGitHubRepo.mockReset();
  });

  it('deve renderizar skeleton durante loading', () => {
    mockUseGitHubRepo.mockReturnValue({
      isLoading: true,
      data: undefined,
      error: null,
    });

    const { container } = renderWithProviders(<RepoPage />, {
      route: '/repo/octocat/Hello-World',
    });

    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('deve renderizar erro quando repositório não for encontrado', () => {
    const error = new GitHubNotFoundError({
      resource: 'repo',
      resourceId: 'octocat/Hello-World',
      apiMessage: 'Not Found',
    });

    mockUseGitHubRepo.mockReturnValue({
      isLoading: false,
      data: undefined,
      error,
    });

    renderWithProviders(<RepoPage />, {
      route: '/repo/octocat/Hello-World',
    });

    expect(screen.getByText('Repositório não encontrado')).toBeInTheDocument();
    expect(
      screen.getByText(
        'O repositório "octocat/Hello-World" não foi encontrado.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar' })).toHaveAttribute(
      'href',
      '/user/octocat',
    );
  });

  it('deve renderizar detalhes do repositório quando dados carregarem', () => {
    const repo = createMockRepo();

    mockUseGitHubRepo.mockReturnValue({
      isLoading: false,
      data: repo,
      error: null,
    });

    renderWithProviders(<RepoPage />, {
      route: '/repo/octocat/Hello-World',
    });

    expect(screen.getByText('octocat/Hello-World')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Ver no GitHub/i }),
    ).toHaveAttribute('href', repo.html_url);
  });
});

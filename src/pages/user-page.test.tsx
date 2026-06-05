import { screen } from '@testing-library/react';
import { UserPage } from './UserPage';
import { renderWithProviders } from '@/test/test-utils';
import { createMockUser, createMockRepo } from '@/test/mocks/github';
import { GitHubNotFoundError } from '@/types/errors';

const mockUseGitHubUser = vi.fn();
const mockUseGitHubRepos = vi.fn();

vi.mock('@/hooks/use-github-user', () => ({
  useGitHubUser: (...args: unknown[]) => mockUseGitHubUser(...args),
}));

vi.mock('@/hooks/use-github-repos', () => ({
  useGitHubRepos: (...args: unknown[]) => mockUseGitHubRepos(...args),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ username: 'ghost' }),
  };
});

describe('UserPage', () => {
  beforeEach(() => {
    mockUseGitHubUser.mockReset();
    mockUseGitHubRepos.mockReset();
  });

  it('deve renderizar skeleton durante loading', () => {
    mockUseGitHubUser.mockReturnValue({
      isLoading: true,
      data: undefined,
      error: null,
    });
    mockUseGitHubRepos.mockReturnValue({
      isLoading: true,
      data: undefined,
      error: null,
    });

    const { container } = renderWithProviders(<UserPage />, {
      route: '/user/ghost',
    });

    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('deve renderizar erro quando usuário não for encontrado', () => {
    const error = new GitHubNotFoundError({
      resource: 'user',
      resourceId: 'ghost',
      apiMessage: 'Not Found',
    });

    mockUseGitHubUser.mockReturnValue({
      isLoading: false,
      data: undefined,
      error,
    });
    mockUseGitHubRepos.mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    });

    renderWithProviders(<UserPage />, { route: '/user/ghost' });

    expect(screen.getByText('Usuário não encontrado')).toBeInTheDocument();
    expect(
      screen.getByText('O usuário "@ghost" não existe no GitHub.'),
    ).toBeInTheDocument();
    expect(screen.getByText('HTTP 404')).toBeInTheDocument();
  });

  it('deve renderizar perfil e lista quando dados carregarem', () => {
    const user = createMockUser({ login: 'ghost' });
    const repos = [
      createMockRepo({ full_name: 'ghost/repo-1', name: 'repo-1' }),
    ];

    mockUseGitHubUser.mockReturnValue({
      isLoading: false,
      data: user,
      error: null,
    });
    mockUseGitHubRepos.mockReturnValue({
      isLoading: false,
      data: repos,
      error: null,
    });

    renderWithProviders(<UserPage />, { route: '/user/ghost' });

    expect(screen.getByText('The Octocat')).toBeInTheDocument();
    expect(screen.getByText('Repositórios (1)')).toBeInTheDocument();
    expect(screen.getByText('repo-1')).toBeInTheDocument();
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RepoList } from './repo-list';
import { renderWithProviders } from '@/test/test-utils';
import { createMockRepo } from '@/test/mocks/github';

describe('RepoList', () => {
  it('deve renderizar skeleton durante loading', () => {
    const { container } = renderWithProviders(
      <RepoList repos={[]} isLoading />,
    );

    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('deve exibir estado vazio quando usuário não tem repositórios', () => {
    renderWithProviders(<RepoList repos={[]} />);

    expect(
      screen.getByText('Nenhum repositório encontrado'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Este usuário não possui repositórios públicos.'),
    ).toBeInTheDocument();
  });

  it('deve exibir cards paginados', () => {
    const repos = Array.from({ length: 12 }, (_, index) =>
      createMockRepo({
        id: index + 1,
        name: `repo-${index + 1}`,
        full_name: `octocat/repo-${index + 1}`,
      }),
    );

    renderWithProviders(<RepoList repos={repos} />, {
      route: '/user/octocat',
      searchParams: '?page=1&perPage=10',
    });

    expect(screen.getByText('Repositórios (12)')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(10);
  });

  it('deve exibir estado vazio quando busca não retorna resultados', async () => {
    const user = userEvent.setup();
    const repos = [createMockRepo({ name: 'react-app' })];

    renderWithProviders(<RepoList repos={repos} />, {
      route: '/user/octocat',
    });

    await user.type(screen.getByLabelText('Buscar repositório'), 'vue');

    await waitFor(
      () => {
        expect(screen.getByText('Nenhum resultado')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    expect(
      screen.getByText('Nenhum repositório encontrado para "vue".'),
    ).toBeInTheDocument();
  });
});

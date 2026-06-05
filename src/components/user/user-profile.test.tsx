import { screen } from '@testing-library/react';
import { UserProfile } from './user-profile';
import { renderWithProviders } from '@/test/test-utils';
import { createMockUser } from '@/test/mocks/github';

describe('UserProfile', () => {
  it('deve renderizar avatar, nome e login', () => {
    const user = createMockUser();
    renderWithProviders(<UserProfile user={user} />);

    expect(screen.getByAltText('Avatar de octocat')).toHaveAttribute(
      'src',
      user.avatar_url,
    );
    expect(screen.getByText('The Octocat')).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
  });

  it('deve renderizar bio quando disponível', () => {
    renderWithProviders(<UserProfile user={createMockUser()} />);
    expect(screen.getByText('GitHub mascot')).toBeInTheDocument();
  });

  it('deve usar login quando name for null', () => {
    renderWithProviders(<UserProfile user={createMockUser({ name: null })} />);
    expect(screen.getAllByText('octocat').length).toBeGreaterThan(0);
  });

  it('deve exibir fallback quando e-mail não estiver disponível', () => {
    renderWithProviders(<UserProfile user={createMockUser({ email: null })} />);
    expect(screen.getByText('E-mail não informado')).toBeInTheDocument();
  });

  it('deve exibir estatísticas formatadas', () => {
    renderWithProviders(<UserProfile user={createMockUser()} />);

    expect(screen.getByText('Seguidores')).toBeInTheDocument();
    expect(screen.getByText('Seguindo')).toBeInTheDocument();
    expect(screen.getByText('Repositórios')).toBeInTheDocument();
    expect(screen.getByText('9.000')).toBeInTheDocument();
  });
});

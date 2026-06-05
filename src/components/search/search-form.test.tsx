import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './search-form';
import { renderWithProviders } from '@/test/test-utils';
import { useSearchStore } from '@/stores/search-store';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SearchForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useSearchStore.setState({ recentUsernames: [] });
  });

  it('deve renderizar o formulário de busca', () => {
    renderWithProviders(<SearchForm />);

    expect(
      screen.getByPlaceholderText('Digite um usuário do GitHub (ex: octocat)'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Buscar usuário' }),
    ).toBeInTheDocument();
  });

  it('deve exibir erro ao enviar formulário vazio', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchForm />);

    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }));

    await waitFor(() => {
      expect(
        screen.getByText('Informe um usuário do GitHub'),
      ).toBeInTheDocument();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('deve exibir erro com username inválido', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchForm />);

    await user.type(
      screen.getByPlaceholderText('Digite um usuário do GitHub (ex: octocat)'),
      'invalid user!',
    );
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }));

    await waitFor(() => {
      expect(screen.getByText('Nome de usuário inválido')).toBeInTheDocument();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('deve navegar e salvar busca recente ao enviar username válido', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchForm />);

    await user.type(
      screen.getByPlaceholderText('Digite um usuário do GitHub (ex: octocat)'),
      'octocat',
    );
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user/octocat');
    });
    expect(useSearchStore.getState().recentUsernames).toContain('octocat');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecentSearches } from './recent-searches';
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

describe('RecentSearches', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useSearchStore.setState({ recentUsernames: [] });
  });

  it('não deve renderizar quando não há buscas recentes', () => {
    const { container } = renderWithProviders(<RecentSearches />);
    expect(container).toBeEmptyDOMElement();
  });

  it('deve exibir chips de buscas recentes', () => {
    useSearchStore.setState({ recentUsernames: ['octocat', 'torvalds'] });
    renderWithProviders(<RecentSearches />);

    expect(screen.getByText('Buscas recentes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'octocat' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'torvalds' }),
    ).toBeInTheDocument();
  });

  it('deve navegar ao clicar em uma busca recente', async () => {
    const user = userEvent.setup();
    useSearchStore.setState({ recentUsernames: ['octocat'] });
    renderWithProviders(<RecentSearches />);

    await user.click(screen.getByRole('button', { name: 'octocat' }));

    expect(mockNavigate).toHaveBeenCalledWith('/user/octocat');
  });
});

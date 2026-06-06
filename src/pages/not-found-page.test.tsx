import { screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';
import { renderWithProviders } from '@/test/test-utils';

describe('NotFoundPage', () => {
  it('deve renderizar mensagem de página não encontrada', () => {
    renderWithProviders(<NotFoundPage />, { route: '/rota-inexistente' });

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada.')).toBeInTheDocument();
  });

  it('deve renderizar link para voltar ao início', () => {
    renderWithProviders(<NotFoundPage />, { route: '/rota-inexistente' });

    expect(
      screen.getByRole('link', { name: 'Voltar para início' }),
    ).toHaveAttribute('href', '/');
  });
});

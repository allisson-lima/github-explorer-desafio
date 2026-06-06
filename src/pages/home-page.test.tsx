import { screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { renderWithProviders } from '@/test/test-utils';

describe('HomePage', () => {
  it('deve renderizar título e descrição da página inicial', () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole('heading', { name: 'GitHub Explorer' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Busque usuários do GitHub e explore seus repositórios mais populares.',
      ),
    ).toBeInTheDocument();
  });

  it('deve renderizar formulário de busca', () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole('heading', { name: 'Buscar usuário' }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Digite um usuário do GitHub (ex: octocat)'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Buscar usuário' }).length,
    ).toBeGreaterThanOrEqual(1);
  });
});

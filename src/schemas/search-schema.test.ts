import { searchSchema } from './search-schema';

describe('searchSchema', () => {
  it('deve rejeitar username vazio', () => {
    const result = searchSchema.safeParse({ username: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Informe um usuário do GitHub',
      );
    }
  });

  it('deve rejeitar username inválido', () => {
    const result = searchSchema.safeParse({ username: 'invalid user!' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Nome de usuário inválido');
    }
  });

  it('deve aceitar username válido', () => {
    const result = searchSchema.safeParse({ username: 'octocat' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe('octocat');
    }
  });

  it('deve remover @ do início do username', () => {
    const result = searchSchema.safeParse({ username: '@octocat' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe('octocat');
    }
  });

  it('deve aplicar trim no username', () => {
    const result = searchSchema.safeParse({ username: '  octocat  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe('octocat');
    }
  });
});

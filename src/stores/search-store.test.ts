import { useSearchStore } from './search-store';

describe('useSearchStore', () => {
  beforeEach(() => {
    useSearchStore.setState({ recentUsernames: [] });
    localStorage.clear();
  });

  it('deve normalizar username para lowercase', () => {
    useSearchStore.getState().addRecentSearch('OctoCat');
    expect(useSearchStore.getState().recentUsernames).toEqual(['octocat']);
  });

  it('deve remover duplicatas e mover para o topo', () => {
    const { addRecentSearch } = useSearchStore.getState();

    addRecentSearch('octocat');
    addRecentSearch('torvalds');
    addRecentSearch('octocat');

    expect(useSearchStore.getState().recentUsernames).toEqual([
      'octocat',
      'torvalds',
    ]);
  });

  it('deve manter no máximo 5 buscas recentes', () => {
    const { addRecentSearch } = useSearchStore.getState();

    addRecentSearch('user1');
    addRecentSearch('user2');
    addRecentSearch('user3');
    addRecentSearch('user4');
    addRecentSearch('user5');
    addRecentSearch('user6');

    expect(useSearchStore.getState().recentUsernames).toHaveLength(5);
    expect(useSearchStore.getState().recentUsernames[0]).toBe('user6');
    expect(useSearchStore.getState().recentUsernames).not.toContain('user1');
  });

  it('deve persistir buscas no localStorage', () => {
    useSearchStore.getState().addRecentSearch('octocat');

    const stored = localStorage.getItem('github-explorer-searches');
    expect(stored).toBeTruthy();
    expect(stored).toContain('octocat');
  });
});

import { useQuery } from '@tanstack/react-query';
import { getUserRepos } from '@/services/github-service';

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ['github', 'repos', username],
    queryFn: () => getUserRepos(username),
    enabled: Boolean(username),
  });
}

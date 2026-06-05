import { useQuery } from '@tanstack/react-query';
import { getRepo } from '@/services/github-service';

export function useGitHubRepo(owner: string, repoName: string) {
  return useQuery({
    queryKey: ['github', 'repo', owner, repoName],
    queryFn: () => getRepo(owner, repoName),
    enabled: Boolean(owner && repoName),
  });
}

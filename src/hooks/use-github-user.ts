import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/github-service';

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ['github', 'user', username],
    queryFn: () => getUser(username),
    enabled: Boolean(username),
  });
}

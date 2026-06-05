import { Link, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/page-container';
import { RepoDetails } from '@/components/repo/repo-details';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGitHubRepo } from '@/hooks/use-github-repo';
import { getErrorMessage } from '@/utils/sort-repos';

export function RepoPage() {
  const { owner = '', repoName = '' } = useParams();
  const { data, isLoading, error } = useGitHubRepo(owner, repoName);

  return (
    <PageContainer className="max-w-3xl">
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-64 w-full" />
        </div>
      )}

      {!isLoading && error && (
        <div className="space-y-4">
          <ErrorState message={getErrorMessage(error)} />
          <Link to={owner ? `/user/${owner}` : '/'}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && data && <RepoDetails repo={data} />}
    </PageContainer>
  );
}

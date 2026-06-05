import { Link, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/page-container';
import { RepoDetails } from '@/components/repo/repo-details';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGitHubRepo } from '@/hooks/use-github-repo';
import { getApiErrorDetails } from '@/utils/get-api-error';

export function RepoPage() {
  const { owner = '', repoName = '' } = useParams();
  const { data, isLoading, error } = useGitHubRepo(owner, repoName);
  const errorDetails = error ? getApiErrorDetails(error) : null;

  return (
    <PageContainer className="max-w-3xl">
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-64 w-full" />
        </div>
      )}

      {!isLoading && errorDetails && (
        <div className="space-y-4">
          <ErrorState
            title={errorDetails.title}
            message={errorDetails.message}
            statusCode={errorDetails.statusCode}
            apiMessage={errorDetails.apiMessage}
          />
          <Link to={owner ? `/user/${owner}` : '/'}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && data && <RepoDetails repo={data} />}
    </PageContainer>
  );
}

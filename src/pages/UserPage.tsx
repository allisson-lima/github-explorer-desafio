import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/page-container';
import { RepoList } from '@/components/repos/repo-list';
import { UserProfile } from '@/components/user/user-profile';
import { UserProfileSkeleton } from '@/components/user/user-profile-skeleton';
import { BackLink } from '@/components/ui/back-link';
import { ErrorState } from '@/components/ui/error-state';
import { Button } from '@/components/ui/button';
import { useGitHubUser } from '@/hooks/use-github-user';
import { useGitHubRepos } from '@/hooks/use-github-repos';
import { useSearchStore } from '@/stores/search-store';
import { getErrorMessage } from '@/utils/sort-repos';

export function UserPage() {
  const { username = '' } = useParams();
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);

  const userQuery = useGitHubUser(username);
  const reposQuery = useGitHubRepos(username);

  useEffect(() => {
    if (username) {
      addRecentSearch(username);
    }
  }, [username, addRecentSearch]);

  const isLoading = userQuery.isLoading || reposQuery.isLoading;
  const error = userQuery.error ?? reposQuery.error;

  return (
    <PageContainer>
      <BackLink to="/" className="mb-6">
        Voltar para busca
      </BackLink>

      {isLoading && (
        <div className="grid items-start gap-6 md:grid-cols-[280px_1fr]">
          <aside className="w-full md:sticky md:top-24">
            <UserProfileSkeleton />
          </aside>
          <RepoList repos={[]} isLoading />
        </div>
      )}

      {!isLoading && error && (
        <div className="mx-auto max-w-xl space-y-4">
          <ErrorState message={getErrorMessage(error)} />
          <Link to="/">
            <Button variant="secondary">Voltar para busca</Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && userQuery.data && (
        <div className="grid items-start gap-6 md:grid-cols-[280px_1fr]">
          <aside className="w-full md:sticky md:top-24">
            <UserProfile user={userQuery.data} />
          </aside>
          <RepoList repos={reposQuery.data ?? []} />
        </div>
      )}
    </PageContainer>
  );
}

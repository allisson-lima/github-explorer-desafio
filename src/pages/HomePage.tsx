import { GitHubIcon } from '@/components/ui/github-icon';
import { PageContainer } from '@/components/layout/page-container';
import { SearchForm } from '@/components/search/search-form';
import { RecentSearches } from '@/components/search/recent-searches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HomePage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#21262d]">
            <GitHubIcon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold">GitHub Explorer</h1>
          <p className="text-github-muted">
            Busque usuários do GitHub e explore seus repositórios mais
            populares.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buscar usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SearchForm />
            <RecentSearches />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

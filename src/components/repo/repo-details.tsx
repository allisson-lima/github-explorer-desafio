import { ExternalLink, GitFork, Star } from 'lucide-react';
import type { GitHubRepo } from '@/types/repo';
import { formatNumber } from '@/utils/format-number';
import { BackLink } from '@/components/ui/back-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RepoDetailsProps {
  repo: GitHubRepo;
}

export function RepoDetails({ repo }: RepoDetailsProps) {
  const updatedAt = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(repo.updated_at));

  return (
    <div className="space-y-6">
      <BackLink to={`/user/${repo.owner.login}`}>
        Voltar para @{repo.owner.login}
      </BackLink>

      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{repo.full_name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-github-muted">
            {repo.description ?? 'Sem descrição disponível.'}
          </p>

          <div className="flex flex-wrap gap-2">
            {repo.language && <Badge>{repo.language}</Badge>}
            <Badge variant="outline" className="gap-1">
              <Star className="h-3 w-3" />
              {formatNumber(repo.stargazers_count)} estrelas
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitFork className="h-3 w-3" />
              {formatNumber(repo.forks_count)} forks
            </Badge>
          </div>

          <p className="text-sm text-github-muted">Atualizado em {updatedAt}</p>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="secondary" type="button">
              Ver no GitHub
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

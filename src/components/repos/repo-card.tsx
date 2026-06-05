import { Link } from 'react-router-dom';
import { GitFork, Star } from 'lucide-react';
import type { GitHubRepo } from '@/types/repo';
import { formatNumber } from '@/utils/format-number';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const [owner, repoName] = repo.full_name.split('/');

  return (
    <Link
      to={`/repo/${owner}/${repoName}`}
      className="block transition-opacity hover:opacity-90"
    >
      <Card className="h-full hover:border-github-blue/50">
        <CardContent className="space-y-3 p-5">
          <div>
            <h3 className="font-semibold text-github-blue">{repo.name}</h3>
            {repo.description && (
              <p className="mt-2 line-clamp-2 text-sm text-github-muted">
                {repo.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {repo.language && <Badge>{repo.language}</Badge>}
            <Badge variant="outline" className="gap-1">
              <Star className="h-3 w-3" />
              {formatNumber(repo.stargazers_count)}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitFork className="h-3 w-3" />
              {formatNumber(repo.forks_count)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

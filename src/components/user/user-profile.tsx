import { Mail, Users } from 'lucide-react';
import type { GitHubUser } from '@/types/user';
import { formatNumber } from '@/utils/format-number';
import { Card, CardContent } from '@/components/ui/card';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="h-fit w-full">
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            className="h-32 w-32 rounded-full border border-github-border"
          />
          <h1 className="mt-4 text-xl font-bold">{user.name ?? user.login}</h1>
          <p className="text-github-muted">@{user.login}</p>
        </div>

        {user.bio && (
          <p className="text-center text-sm text-github-muted">{user.bio}</p>
        )}

        <div className="flex items-center gap-2 text-sm text-github-muted">
          <Mail className="h-4 w-4 shrink-0" />
          <span>{user.email ?? 'E-mail não informado'}</span>
        </div>

        <UserStats user={user} />
      </CardContent>
    </Card>
  );
}

function UserStats({ user }: UserProfileProps) {
  const stats = [
    { label: 'Seguidores', value: user.followers },
    { label: 'Seguindo', value: user.following },
    { label: 'Repositórios', value: user.public_repos },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 border-t border-github-border pt-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-github-muted">
            <Users className="h-3 w-3" />
            {stat.label}
          </div>
          <p className="mt-1 font-semibold">{formatNumber(stat.value)}</p>
        </div>
      ))}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useSearchStore } from '@/stores/search-store';
import { Button } from '@/components/ui/button';

export function RecentSearches() {
  const navigate = useNavigate();
  const recentUsernames = useSearchStore((state) => state.recentUsernames);

  if (recentUsernames.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-github-muted">
        <Clock className="h-4 w-4" />
        <span>Buscas recentes</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentUsernames.map((username) => (
          <Button
            key={username}
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/user/${username}`)}
          >
            {username}
          </Button>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-github-muted">Página não encontrada.</p>
        <Link to="/">
          <Button>Voltar para início</Button>
        </Link>
      </div>
    </PageContainer>
  );
}

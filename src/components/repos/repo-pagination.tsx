import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REPO_PER_PAGE_OPTIONS } from '@/constants/repo-pagination';
import { getPaginationRange } from '@/utils/filter-repos';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface RepoPaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export function RepoPagination({
  currentPage,
  totalPages,
  perPage,
  totalItems,
  onPageChange,
  onPerPageChange,
}: RepoPaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);
  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className="space-y-4 border-t border-github-border pt-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-github-muted">
          Mostrando {start}-{end} de {totalItems} repositórios
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="per-page" className="text-sm text-github-muted">
            Itens por página
          </label>
          <Select
            id="per-page"
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
            aria-label="Itens por página"
            className="w-20"
          >
            {REPO_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {totalPages > 1 && (
        <nav
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          aria-label="Paginação de repositórios"
        >
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>

            <div className="flex items-center gap-1 px-1">
              {pages.map((page, index) => {
                const previousPage = pages[index - 1];
                const showEllipsis =
                  previousPage !== undefined && page - previousPage > 1;

                return (
                  <div key={page} className="flex items-center gap-1">
                    {showEllipsis && (
                      <span className="px-1 text-sm text-github-muted">
                        ...
                      </span>
                    )}
                    <Button
                      type="button"
                      variant={page === currentPage ? 'primary' : 'secondary'}
                      size="sm"
                      className={cn('min-w-9')}
                      onClick={() => onPageChange(page)}
                      aria-label={`Página ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Próxima página"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-github-muted sm:hidden">
            Página {currentPage} de {totalPages}
          </p>
        </nav>
      )}
    </div>
  );
}

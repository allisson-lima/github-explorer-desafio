import { Link } from 'react-router-dom';
import { GitHubIcon } from '@/components/ui/github-icon';
import { SearchForm } from '@/components/search/search-form';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-github-border bg-[#161b22]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center gap-3 sm:h-16 sm:gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 font-semibold"
          >
            <GitHubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="hidden text-sm sm:inline sm:text-base">
              GitHub Explorer
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 md:block">
            <SearchForm
              variant="compact"
              inputId="header-search-desktop"
              className="max-w-xl"
            />
          </div>

          <span className="ml-auto hidden shrink-0 text-sm text-github-muted lg:block">
            Desbravador Challenge
          </span>
        </div>

        <div className="pb-3 md:hidden">
          <SearchForm variant="compact" inputId="header-search-mobile" />
        </div>
      </div>
    </header>
  );
}

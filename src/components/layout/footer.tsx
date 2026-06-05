export function Footer() {
  return (
    <footer className="border-t border-github-border py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-github-muted">
        Dados fornecidos pela{' '}
        <a
          href="https://docs.github.com/en/rest"
          target="_blank"
          rel="noopener noreferrer"
          className="text-github-blue hover:underline"
        >
          GitHub REST API
        </a>
      </div>
    </footer>
  );
}

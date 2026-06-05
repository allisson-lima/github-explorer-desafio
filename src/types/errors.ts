export type GitHubResource = 'user' | 'repo';

export interface GitHubErrorOptions {
  statusCode: number;
  apiMessage?: string;
  resource?: GitHubResource;
  resourceId?: string;
}

abstract class BaseGitHubError extends Error {
  readonly statusCode: number;
  readonly apiMessage?: string;
  readonly resource?: GitHubResource;
  readonly resourceId?: string;

  constructor(name: string, message: string, options: GitHubErrorOptions) {
    super(message);
    this.name = name;
    this.statusCode = options.statusCode;
    this.apiMessage = options.apiMessage;
    this.resource = options.resource;
    this.resourceId = options.resourceId;
  }
}

export class GitHubNotFoundError extends BaseGitHubError {
  constructor(
    options: Omit<GitHubErrorOptions, 'statusCode'> & { message?: string },
  ) {
    super(
      'GitHubNotFoundError',
      options.message ?? 'Recurso não encontrado no GitHub',
      { ...options, statusCode: 404 },
    );
  }
}

export class GitHubRateLimitError extends BaseGitHubError {
  constructor(
    options: Omit<GitHubErrorOptions, 'statusCode'> & { message?: string } = {},
  ) {
    super(
      'GitHubRateLimitError',
      options.message ??
        'Limite de requisições excedido. Tente novamente mais tarde.',
      { ...options, statusCode: 403 },
    );
  }
}

export class GitHubApiError extends BaseGitHubError {
  constructor(options: GitHubErrorOptions & { message?: string }) {
    super(
      'GitHubApiError',
      options.message ?? 'Erro ao comunicar com a API do GitHub',
      options,
    );
  }
}

export function isGitHubError(error: unknown): error is BaseGitHubError {
  return error instanceof BaseGitHubError;
}

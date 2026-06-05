export class GitHubNotFoundError extends Error {
  constructor(message = 'Recurso não encontrado no GitHub') {
    super(message);
    this.name = 'GitHubNotFoundError';
  }
}

export class GitHubRateLimitError extends Error {
  constructor(
    message = 'Limite de requisições excedido. Tente novamente mais tarde.',
  ) {
    super(message);
    this.name = 'GitHubRateLimitError';
  }
}

export class GitHubApiError extends Error {
  constructor(message = 'Erro ao comunicar com a API do GitHub') {
    super(message);
    this.name = 'GitHubApiError';
  }
}

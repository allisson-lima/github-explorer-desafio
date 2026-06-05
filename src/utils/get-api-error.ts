import {
  GitHubApiError,
  GitHubNotFoundError,
  GitHubRateLimitError,
  isGitHubError,
} from '@/types/errors';

export interface ApiErrorDetails {
  title: string;
  message: string;
  statusCode?: number;
  apiMessage?: string;
}

export function getApiErrorDetails(error: unknown): ApiErrorDetails {
  if (error instanceof GitHubNotFoundError) {
    if (error.resource === 'user' && error.resourceId) {
      return {
        title: 'Usuário não encontrado',
        message: `O usuário "@${error.resourceId}" não existe no GitHub.`,
        statusCode: error.statusCode,
        apiMessage: error.apiMessage,
      };
    }

    if (error.resource === 'repo' && error.resourceId) {
      return {
        title: 'Repositório não encontrado',
        message: `O repositório "${error.resourceId}" não foi encontrado.`,
        statusCode: error.statusCode,
        apiMessage: error.apiMessage,
      };
    }

    return {
      title: 'Não encontrado',
      message: error.message,
      statusCode: error.statusCode,
      apiMessage: error.apiMessage,
    };
  }

  if (error instanceof GitHubRateLimitError) {
    return {
      title: 'Limite de requisições',
      message: error.message,
      statusCode: error.statusCode,
      apiMessage: error.apiMessage,
    };
  }

  if (error instanceof GitHubApiError) {
    return {
      title: 'Erro na API',
      message: error.message,
      statusCode: error.statusCode,
      apiMessage: error.apiMessage,
    };
  }

  if (isGitHubError(error)) {
    return {
      title: 'Erro na API',
      message: error.message,
      statusCode: error.statusCode,
      apiMessage: error.apiMessage,
    };
  }

  if (error instanceof Error) {
    return {
      title: 'Algo deu errado',
      message: error.message,
    };
  }

  return {
    title: 'Algo deu errado',
    message: 'Ocorreu um erro inesperado',
  };
}

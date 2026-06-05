import {
  GitHubApiError,
  GitHubNotFoundError,
  GitHubRateLimitError,
} from '@/types/errors';
import { getApiErrorDetails } from './get-api-error';

describe('getApiErrorDetails', () => {
  it('deve mapear usuário não encontrado', () => {
    const error = new GitHubNotFoundError({
      resource: 'user',
      resourceId: 'ghost',
      apiMessage: 'Not Found',
    });

    expect(getApiErrorDetails(error)).toEqual({
      title: 'Usuário não encontrado',
      message: 'O usuário "@ghost" não existe no GitHub.',
      statusCode: 404,
      apiMessage: 'Not Found',
    });
  });

  it('deve mapear repositório não encontrado', () => {
    const error = new GitHubNotFoundError({
      resource: 'repo',
      resourceId: 'octocat/missing',
      apiMessage: 'Not Found',
    });

    expect(getApiErrorDetails(error)).toEqual({
      title: 'Repositório não encontrado',
      message: 'O repositório "octocat/missing" não foi encontrado.',
      statusCode: 404,
      apiMessage: 'Not Found',
    });
  });

  it('deve mapear erro genérico de não encontrado', () => {
    const error = new GitHubNotFoundError({ message: 'Recurso ausente' });

    expect(getApiErrorDetails(error)).toEqual({
      title: 'Não encontrado',
      message: 'Recurso ausente',
      statusCode: 404,
      apiMessage: undefined,
    });
  });

  it('deve mapear limite de requisições', () => {
    const error = new GitHubRateLimitError({
      apiMessage: 'API rate limit exceeded',
    });

    expect(getApiErrorDetails(error)).toEqual({
      title: 'Limite de requisições',
      message: error.message,
      statusCode: 403,
      apiMessage: 'API rate limit exceeded',
    });
  });

  it('deve mapear erro genérico da API', () => {
    const error = new GitHubApiError({
      statusCode: 500,
      apiMessage: 'Internal Server Error',
    });

    expect(getApiErrorDetails(error)).toEqual({
      title: 'Erro na API',
      message: error.message,
      statusCode: 500,
      apiMessage: 'Internal Server Error',
    });
  });

  it('deve mapear Error genérico', () => {
    expect(getApiErrorDetails(new Error('Falha inesperada'))).toEqual({
      title: 'Algo deu errado',
      message: 'Falha inesperada',
    });
  });

  it('deve mapear erro desconhecido', () => {
    expect(getApiErrorDetails(null)).toEqual({
      title: 'Algo deu errado',
      message: 'Ocorreu um erro inesperado',
    });
  });
});

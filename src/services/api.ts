import axios from 'axios';
import {
  GitHubApiError,
  GitHubNotFoundError,
  GitHubRateLimitError,
  type GitHubResource,
} from '@/types/errors';

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

function parseResourceFromUrl(url?: string): {
  resource?: GitHubResource;
  resourceId?: string;
} {
  if (!url) {
    return {};
  }

  const repoMatch = url.match(/\/repos\/([^/]+)\/([^/?]+)/);
  if (repoMatch) {
    return {
      resource: 'repo',
      resourceId: `${repoMatch[1]}/${repoMatch[2]}`,
    };
  }

  const userMatch = url.match(/\/users\/([^/?]+)/);
  if (userMatch) {
    return {
      resource: 'user',
      resourceId: userMatch[1],
    };
  }

  return {};
}

function getApiMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined;
  }

  const data = error.response?.data;

  if (data && typeof data === 'object' && 'message' in data) {
    const message = data.message;
    return typeof message === 'string' ? message : undefined;
  }

  return undefined;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 0;
    const apiMessage = getApiMessage(error);
    const { resource, resourceId } = parseResourceFromUrl(error.config?.url);

    const context = { apiMessage, resource, resourceId };

    if (status === 404) {
      return Promise.reject(new GitHubNotFoundError(context));
    }

    if (status === 403) {
      return Promise.reject(new GitHubRateLimitError(context));
    }

    return Promise.reject(
      new GitHubApiError({
        statusCode: status || 500,
        ...context,
        message: apiMessage ?? 'Erro ao comunicar com a API do GitHub',
      }),
    );
  },
);

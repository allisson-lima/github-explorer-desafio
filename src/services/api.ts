import axios from 'axios';
import {
  GitHubApiError,
  GitHubNotFoundError,
  GitHubRateLimitError,
} from '@/types/errors';

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 404) {
      return Promise.reject(new GitHubNotFoundError());
    }

    if (status === 403) {
      return Promise.reject(new GitHubRateLimitError());
    }

    return Promise.reject(
      new GitHubApiError(
        error.response?.data?.message ??
          'Erro ao comunicar com a API do GitHub',
      ),
    );
  },
);

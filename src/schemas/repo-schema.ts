import { z } from 'zod';

export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  html_url: z.string().url(),
  forks_count: z.number(),
  updated_at: z.string(),
  owner: z.object({
    login: z.string(),
  }),
});

export type GitHubRepoSchema = z.infer<typeof githubRepoSchema>;

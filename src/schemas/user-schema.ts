import { z } from 'zod';

export const githubUserSchema = z.object({
  login: z.string(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  email: z.string().nullable(),
  public_repos: z.number(),
  html_url: z.string().url(),
  name: z.string().nullable(),
});

export type GitHubUserSchema = z.infer<typeof githubUserSchema>;

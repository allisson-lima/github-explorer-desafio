import { z } from 'zod';
import { githubUserSchema } from '@/schemas/user-schema';

export type GitHubUser = z.infer<typeof githubUserSchema>;

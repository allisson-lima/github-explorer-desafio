import { z } from 'zod';

const GITHUB_USERNAME_REGEX =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export const searchSchema = z.object({
  username: z
    .string()
    .min(1, 'Informe um usuário do GitHub')
    .regex(GITHUB_USERNAME_REGEX, 'Nome de usuário inválido'),
});

export type SearchFormData = z.infer<typeof searchSchema>;

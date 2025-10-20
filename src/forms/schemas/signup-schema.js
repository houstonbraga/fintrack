import z from 'zod'

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório',
    }),
    email: z
      .string()
      .email({ message: 'O email é inválido' })
      .trim()
      .min(1, { message: 'O email é obrigatório' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Senha deve conter no mínimo 8 caracteres' }),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, { message: 'Senha deve conter no mínimo 8 caracteres' }),
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: 'Precisa aceitar os termos para criação de conta',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem!',
    path: ['passwordConfirmation'],
  })

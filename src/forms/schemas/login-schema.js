import z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Esse email não existe',
    })
    .trim()
    .min(1, {
      message: 'Email é obrigatório',
    }),
  password: z.string().trim().min(1, { message: 'A senha é obrigatória' }),
})

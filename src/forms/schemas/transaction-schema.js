import z from 'zod'

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome deve conter no mínimo 1 caractere!',
  }),
  amount: z.number({
    required_error: 'O valor precisa ser preenchido!',
  }),
  date: z.date(),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
})

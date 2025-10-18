import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateTransaction } from '@/api/hooks/transaction'

import { createTransactionFormSchema } from '../schemas/schema'

export const useFormCreateTransaction = ({ onSuccess, onError }) => {
  const { mutateAsync: createMutate } = useCreateTransaction()

  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })
  const onSubmit = async (data) => {
    try {
      await createMutate(data)
      onSuccess()
    } catch {
      onError()
    }
  }

  return { form, onSubmit }
}

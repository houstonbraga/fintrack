import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  useCreateTransaction,
  useUpdateTransaction,
} from '@/api/hooks/transaction'

import {
  createTransactionFormSchema,
  updateTransactionFormSchema,
} from '../schemas/transaction-schema'

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

export const useFormUpdateTransaction = ({
  transaction,
  onSuccess,
  onError,
}) => {
  const { mutateAsync: updateTransaction } = useUpdateTransaction()
  const form = useForm({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: new Date(transaction.date),
      type: transaction.type,
    },
    shouldUnregister: true,
  })

  const onSubmit = async (data) => {
    await updateTransaction(data)
    try {
      onSuccess()
    } catch {
      onError()
    }
  }

  return { form, onSubmit }
}

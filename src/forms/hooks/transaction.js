import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateTransaction,
  useUpdateTransaction,
} from '@/api/hooks/transaction'
import { getTransactionDate } from '@/helpers/date'

import {
  createTransactionFormSchema,
  updateTransactionFormSchema,
} from '../schemas/transaction-schema.js'

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction()
  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })
  const onSubmit = async (data) => {
    try {
      await createTransaction(data)
      onSuccess()
    } catch (error) {
      console.error(error)
      onError()
    }
  }
  return { form, onSubmit }
}

const getEditTransactionFormDefaultValues = (transaction) => ({
  name: transaction.name,
  amount: parseFloat(transaction.amount),
  date: getTransactionDate(transaction),
  type: transaction.type,
})

export const useUpdateTransactionForm = ({
  transaction,
  onSuccess,
  onError,
}) => {
  const { mutateAsync: updateTransaction } = useUpdateTransaction()
  const form = useForm({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: getEditTransactionFormDefaultValues(transaction),
    shouldUnregister: true,
  })
  useEffect(() => {
    form.reset(getEditTransactionFormDefaultValues(transaction))
    form.setValue('id', transaction.id)
  }, [form, transaction])
  const onSubmit = async (data) => {
    await updateTransaction(data)
    try {
      onSuccess()
    } catch (error) {
      console.error(error)
      onError()
    }
  }
  return { form, onSubmit }
}

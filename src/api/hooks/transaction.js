import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/contexts/auth'

import { TransactionServices } from '../services/transaction'
import { getBalanceQueryKey } from './user'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: async (input) => await TransactionServices.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getBalanceQueryKey({ userId: user.id }),
      })
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      })
    },
  })
}

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }
  return ['getTransactions', userId, from, to]
}

export const useGetAllTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: async () => await TransactionServices.getAll({ from, to }),
    enabled: !!from && !!to && !!user.id,
  })
}

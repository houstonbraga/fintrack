import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    },
  })
}

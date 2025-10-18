import { useMutation, useQuery } from '@tanstack/react-query'

import { UserServices } from '@/api/services/user'
import { useAuthContext } from '@/contexts/auth'

export const getBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }
  return ['balance', userId, from, to]
}

//PEGA O BALANCE DO USUÁRIO AUTENTICADO, PEGANDO O FROM E TO
export const useGetBalance = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: async () => {
      return UserServices.getBalance({ from, to })
    },
    staleTime: 5 * 60 * 1000, //5 minutos
    enabled: !!from && !!to && !!user.id, //também podemos usar "Boolean(valor)"
  })
}

//FAZ CADASTRO DE USUÁRIO
export const signupMutationKey = ['signup']

export const useSignup = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (variables) => {
      const response = await UserServices.signup(variables)
      return response
    },
  })
}

//FAZ LOGIN DE USUÁRIO CADASTRADO
export const loginMutationKey = ['login']

export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: async (variables) => {
      const response = await UserServices.login(variables)
      return response
    },
  })
}

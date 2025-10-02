import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/keys-tokens'
import { UserServices } from '@/services/user.js'

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signout: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)

  const setTokens = (tokens) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, tokens.refreshToken)
  }

  const removeTokens = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN)
  }

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserServices.signup(variables)
      return response
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await UserServices.login(variables)
      return response
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
        if (!accessToken && !refreshToken) return
        const response = await UserServices.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error.message)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setTokens(createdUser.tokens)
        setUser(createdUser)
        toast.success('Conta criada com sucesso!')
      },

      onError: () => {
        toast.error('Erro ao criar conta.')
      },
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loginUser) => {
        setTokens(loginUser.tokens)
        setUser(loginUser)
        toast.success('Login realizado!')
      },
      onError: () => {
        toast.error('Erro ao fazer login, tente novamente mais tarde!')
      },
    })
  }

  const signout = () => {
    setUser(null)
    removeTokens()
  }

  return (
    <AuthContext.Provider
      value={{ user, isInitializing, signup, login, signout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

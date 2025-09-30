import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

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

  const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken'
  const LOCAL_STORAGE_REFRESH_TOKEN = 'refreshToken'

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
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        setUser(null)
        removeTokens()
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

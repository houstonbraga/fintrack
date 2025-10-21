import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignup } from '@/api/hooks/user'
import { UserServices } from '@/api/services/user.js'
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/keys-tokens'

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

  const signupMutation = useSignup() //chama o hook de criar conta

  const loginMutation = useLogin() //chama o hook de fazer login

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

  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data)
      setTokens(createdUser.tokens)
      setUser(createdUser)
      toast.success('Conta criada com sucesso!')
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (data) => {
    try {
      const loginUser = await loginMutation.mutateAsync(data)
      setTokens(loginUser.tokens)
      setUser(loginUser)
      toast.success('Login realizado!')
    } catch (error) {
      console.error(error)
    }
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

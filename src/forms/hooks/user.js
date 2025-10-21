import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@/contexts/auth'

import { loginSchema } from '../schemas/login-schema'
import { signUpSchema } from '../schemas/signup-schema'

export const useLoginForm = () => {
  //LOGIN

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return { form }
}

export const useSignupForm = () => {
  //SIGNUP
  const { signup } = useAuthContext()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      acceptTerms: false,
    },
  })

  const handleSubmit = (data) => signup(data)
  //autentica os tokens que esta armazenado no localstorage caso o usuario ja tenha sido cadastrado

  return { form, handleSubmit }
}

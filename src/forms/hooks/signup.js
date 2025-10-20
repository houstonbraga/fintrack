import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@/contexts/auth'

import { signUpSchema } from '../schemas/signup-schema'

export const useSignupForm = () => {
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

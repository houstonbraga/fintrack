import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@/contexts/auth'

import { loginSchema } from '../schemas/login-schema'

export const useLoginForm = () => {
  const { login } = useAuthContext()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => {
    login(data)
  }

  return { form, handleSubmit }
}

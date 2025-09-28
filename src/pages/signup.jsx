import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório',
    }),
    email: z
      .string()
      .email({ message: 'O email é inválido' })
      .trim()
      .min(1, { message: 'O email é obrigatório' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Senha deve conter no mínimo 8 caracteres' }),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, { message: 'Senha deve conter no mínimo 8 caracteres' }),
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: 'Precisa aceitar os termos para criação de conta',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem!',
    path: ['passwordConfirmation'],
  })

const SignUpPage = () => {
  const [user, setUser] = useState(null)

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

  const methods = useForm({
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

  const handleSubmit = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Conta criada com sucesso!')
      },

      onError: () => {
        toast.error('Erro ao criar conta.')
      },
    })
  }

  if (user) {
    return <h1>Ola {user.first_name}</h1>
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="w-[400px]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Cadastre-se</CardTitle>
              <CardDescription>Faça o cadastro para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 space-x-2">
                <FormField
                  control={methods.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome"
                          {...field}
                          className="bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Sobrenome"
                          {...field}
                          className="bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword className="bg-transparent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        className="bg-transparent"
                        placeholder="Digite novamente sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="acceptTerms"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel
                        className={`text-sm font-normal text-muted-foreground ${methods.formState.errors.acceptTerms && 'text-red-400'}`}
                      >
                        Aceito os termos de privacidade
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg" variant="default">
                Cadastre-se
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center gap-2 text-sm">
        <p>Já tem uma conta?</p>
        <Link to="/login" className="font-semibold text-primary">
          Entrar.
        </Link>
      </div>

      <svg
        className="absolute bottom-0 left-0 right-0 -z-10 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#55b32e"
          fillOpacity="1"
          d="M0,160L16,160C32,160,64,160,96,149.3C128,139,160,117,192,96C224,75,256,53,288,42.7C320,32,352,32,384,80C416,128,448,224,480,240C512,256,544,192,576,192C608,192,640,256,672,261.3C704,267,736,213,768,181.3C800,149,832,139,864,138.7C896,139,928,149,960,165.3C992,181,1024,203,1056,218.7C1088,235,1120,245,1152,213.3C1184,181,1216,107,1248,80C1280,53,1312,75,1344,80C1376,85,1408,75,1424,69.3L1440,64L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
}

export default SignUpPage

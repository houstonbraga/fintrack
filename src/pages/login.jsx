import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/contexts/auth'

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Esse email não existe',
    })
    .trim()
    .min(1, {
      message: 'Email é obrigatório',
    }),
  password: z.string().trim().min(1, { message: 'A senha é obrigatória' }),
})

const LoginPage = () => {
  const { user, login } = useContext(AuthContext)

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => login(data)

  if (user) {
    return <h1>Ola, {user.first_name}</h1>
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form
          className="w-[400px]"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Faça login</CardTitle>
              <CardDescription>Entre em uma conta existente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                      <InputPassword
                        className="bg-transparent"
                        placeholder="Senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg" variant="default">
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center gap-2 text-sm">
        <p>Ainda não tem uma conta?</p>
        <Link to="/signup" className="font-semibold text-primary">
          Criar uma.
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

export default LoginPage

import { Link } from 'react-router'
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
import { Input } from '@/components/ui/input'

const signUpSchema = z.object({
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
console.log(signUpSchema)

const SignUpPage = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <Card className="z-10 w-[450px]">
        <CardHeader>
          <CardTitle>Cadastre-se</CardTitle>
          <CardDescription>Faça o cadastro para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <div className="grid grid-cols-2">
              <Input
                className="bg-transparent"
                type="text"
                name="firstName"
                placeholder="Nome"
              />
              <Input
                className="bg-transparent"
                type="text"
                name="lastName"
                placeholder="Sobrenome"
              />
            </div>

            <Input
              className="bg-transparent"
              type="email"
              name="email"
              placeholder="Email"
            />
            <InputPassword className="bg-transparent" />
            <InputPassword
              className="bg-transparent"
              placeholder="Confirme sua senha"
            />
            <div className="flex items-center gap-2">
              <Checkbox />
              <p className="text-gray-600 text-muted-foreground">
                Aceito os termos e condições
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-lg" type="submit" variant="default">
            Cadastre-se
          </Button>
        </CardFooter>
        <div className="mb-4 flex items-center justify-center gap-2 text-sm">
          <p>Já tem uma conta?</p>
          <Link to="/login" className="font-semibold text-primary">
            Entrar.
          </Link>
        </div>
      </Card>

      <svg
        className="absolute bottom-0 left-0 right-0 opacity-50"
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

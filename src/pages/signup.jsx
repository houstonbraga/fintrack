import { Link } from 'react-router'

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
import { Input } from '@/components/ui/input'

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
            <Input
              className="bg-transparent"
              type="text"
              placeholder="Digite seu nome"
            />
            <Input
              className="bg-transparent"
              type="email"
              placeholder="Digite seu email"
            />
            <InputPassword className="bg-transparent" />
            <InputPassword
              className="bg-transparent"
              placeholder="Confirme sua senha"
            />
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
          d="M0,224L20,202.7C40,181,80,139,120,101.3C160,64,200,32,240,37.3C280,43,320,85,360,122.7C400,160,440,192,480,202.7C520,213,560,203,600,192C640,181,680,171,720,144C760,117,800,75,840,101.3C880,128,920,224,960,224C1000,224,1040,128,1080,117.3C1120,107,1160,181,1200,202.7C1240,224,1280,192,1320,186.7C1360,181,1400,203,1420,213.3L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
}

export default SignUpPage

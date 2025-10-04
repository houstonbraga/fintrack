import { PlusIcon } from 'lucide-react'
import { Navigate } from 'react-router'

import DateSelection from '@/components/date-select'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext() //estados de contextos

  if (isInitializing) return null //caso seja true, não aparecerá nada para o usuário

  if (!user) {
    return <Navigate to={'/login'} />
  } //caso o usuário não esteja logado, irá para a tela de login

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <DateSelection />
            <Button className="flex items-center gap-2">
              <PlusIcon />
              Nova transação
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

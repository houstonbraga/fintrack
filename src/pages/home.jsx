import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, signout } = useAuthContext()

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <h1>
        Ola, {user.first_name} {user.last_name}
      </h1>
      <Button onClick={signout}>Sair</Button>
    </>
  )
}

export default HomePage

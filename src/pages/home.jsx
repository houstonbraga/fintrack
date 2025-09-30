import { Navigate } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return (
    <h1>
      Ola, {user.first_name} {user.last_name}
    </h1>
  )
}

export default HomePage

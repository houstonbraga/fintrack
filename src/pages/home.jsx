import { Navigate } from 'react-router'

import Header from '@/components/Header'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Header />
    </>
  )
}

export default HomePage

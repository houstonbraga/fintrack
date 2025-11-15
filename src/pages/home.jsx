import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import { ChartPieLegend } from '@/components/chart-pie-legend'
import DateSelection from '@/components/date-select'
import Header from '@/components/Header'
import TransactionsTable from '@/components/transactions-table'
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
      <div className="flex h-[calc(100vh-96px)] flex-col space-y-6 overflow-hidden p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <Balance />
          {/* Colocar aqui o Pie Chart */}

          <ChartPieLegend />
        </div>
        <TransactionsTable />
      </div>
    </>
  )
}

export default HomePage

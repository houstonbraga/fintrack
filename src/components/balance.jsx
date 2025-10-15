import { useQuery } from '@tanstack/react-query'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { UserServices } from '@/services/user'

import ItemBalance from './item-balance'

const Balance = () => {
  const { user } = useAuthContext()
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data } = useQuery({
    queryKey: ['balance', user.id, from, to],
    queryFn: async () => {
      return UserServices.getBalance({ from, to })
    },
  })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <ItemBalance
        title="Saldo"
        icon={<WalletIcon size={18} />}
        amount={data?.balance}
      />
      <ItemBalance
        title="Ganhos"
        icon={<TrendingUpIcon size={18} className="text-green-500" />}
        amount={data?.earnings}
      />
      <ItemBalance
        title="Gastos"
        icon={<TrendingDownIcon size={18} className="text-red-500" />}
        amount={data?.expenses}
      />
      <ItemBalance
        title="Inverstimentos"
        icon={<PiggyBankIcon size={18} className="text-blue-500" />}
        amount={data?.investments}
      />
    </div>
  )
}

export default Balance

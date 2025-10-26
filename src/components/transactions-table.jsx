import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'react-router'

import { useGetAllTransactions } from '@/api/hooks/transaction'
import { getCurrencyFormat } from '@/helpers/currencyFormat'

import TransactionType from './transaction-type'
import { DataTable } from './ui/data-table'
import { ScrollArea } from './ui/scroll-area'

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionType variant={transaction.type.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return getCurrencyFormat(transaction.amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'AÇÕES',
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetAllTransactions({ from, to })
  if (!transactions) return null

  return (
    <div>
      <h1 className="text-4xl font-semibold">Transações</h1>
      <ScrollArea className="w-ful h-[250px] max-h-[450px] rounded-md border">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </div>
  )
}

export default TransactionsTable

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'react-router'

import { useGetAllTransactions } from '@/api/hooks/transaction'
import { getCurrencyFormat } from '@/helpers/currency-format'

import EditTransactionButton from './edit-transaction-button'
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
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />
    },
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetAllTransactions({ from, to })
  if (!transactions) return null

  return (
    <div className="flex h-full min-h-0 flex-col space-y-6">
      <h1 className="text-2xl font-bold">Transações</h1>
      <ScrollArea className="min-h-0 w-full flex-1 rounded-md border pb-4">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </div>
  )
}

export default TransactionsTable

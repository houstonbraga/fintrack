import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const Variants = cva(
  'rounded-full bg-muted w-fit py-[2px] px-2 text-xs font-bold gap-1.5 flex items-center justify-center',
  {
    variants: {
      variant: {
        earning: 'fill-primary text-primary',
        expense: 'fill-red-500 text-red-500',
        investment: 'fill-blue-500 text-blue-500',
      },
    },
  }
) //variantes de estilização

const getText = (variant) => {
  switch (variant) {
    case 'earning':
      return 'Ganho'
    case 'expense':
      return 'Gasto'
    case 'investment':
      return 'Investimento'
    default:
      return ''
  }
} //variantes de textos

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={Variants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getText(variant)}
    </div>
  )
}

export default TransactionTypeBadge

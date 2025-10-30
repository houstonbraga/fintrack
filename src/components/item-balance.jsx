import { getCurrencyFormat } from '@/helpers/currency-format'

import { Card, CardContent } from './ui/card'

const ItemBalance = ({ title, amount, icon }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-muted p-2">
            {icon}
          </div>
          <p className="text-muted-foreground">{title}</p>
        </div>
        <h1>{getCurrencyFormat(amount)}</h1>
      </CardContent>
    </Card>
  )
}

export default ItemBalance

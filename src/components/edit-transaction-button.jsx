import { ExternalLink } from 'lucide-react'

import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLink />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar transação</SheetTitle>
          {transaction.name}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton

import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParams = (date) => format(date, 'yyyy-MM-dd')

const DateSelection = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams() //hook usado para pegar parametros URL
  const navigate = useNavigate()

  const getInitialDateState = (searchParams) => {
    //parametros padrão
    const defaultParams = {
      from: new Date(),
      to: addMonths(new Date(), 1),
    }
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    //caso o from e to não existam, retorne o padrão
    if (!from || !to) {
      return defaultParams
    }
    //validar caso seja válido o from e to
    const invalidateParams = !isValid(new Date(from)) || !isValid(new Date(to))
    if (invalidateParams) {
      return defaultParams
    }
    return {
      from: new Date(from + +'T00:00:00'),
      to: new Date(to + +'T00:00:00'),
    }
  }

  const [date, setDate] = useState(getInitialDateState(searchParams))

  //1 - Sempre que o state date mudar, eu preciso persisti-lo na url (/?from=&to=)

  useEffect(() => {
    if (!date?.from || !date?.to) return //caso o from ou o to não for selecionado, encerra a função
    const queryParams = new URLSearchParams() //cria os parametros da url
    queryParams.set('from', formatDateToQueryParams(date.from))
    queryParams.set('to', formatDateToQueryParams(date.to))
    navigate(`/?${queryParams.toString()}`) //ao passar pelos processos, navega até a url
    queryClient.invalidateQueries({
      //ao mudar o date-select, mudara a balança também (fará request novamente)
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParams(date.from),
        formatDateToQueryParams(date.to),
      ],
    })
  }, [date, navigate, user.id, queryClient]) //todos os hooks que estão dentro do useEffect precisam ir pra lista de dependências

  //2 - preciso que ao recarregar a página, o estado da date persista

  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection

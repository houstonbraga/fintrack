import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParams = (date) => format(date, 'yyyy-MM-dd')

const DateSelection = () => {
  const [searchParams] = useSearchParams() //hook usado para pegar parametros URL
  const navigate = useNavigate()
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00') //pega a data atual from, (ambas precisam zerar o tempo)
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00') //pega a data atual to
      : addMonths(new Date(), 1),
  })

  //1 - Sempre que o state date mudar, eu preciso persisti-lo na url (/?from=&to=)

  useEffect(() => {
    if (!date?.from || !date?.to) return //caso o from ou o to não for selecionado, encerra a função
    const queryParams = new URLSearchParams() //cria os parametros da url
    queryParams.set('from', formatDateToQueryParams(date.from))
    queryParams.set('to', formatDateToQueryParams(date.to))
    navigate(`/?${queryParams.toString()}`) //ao passar pelos processos, navega até a url
  }, [date, navigate]) //todos os hooks que estão dentro do useEffect precisam ir pra lista de dependências

  //2 - preciso que ao recarregar a página, o estado da date persista

  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection

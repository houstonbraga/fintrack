import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionServices = {
  /**
   * ADICIONAR TRANSAÇÃO
   * @param {Object} input - Dados da transação
   * @param {string} input.name - Nome da transação
   * @param {date} input.date - Data da transação - YYYY/MM/DD
   * @param {number} input.amount - Valor da transação - BRL
   * @param {string} input.type - tipo da transação ['EARNING', 'EXPENSE', 'INVESTMENT']
   */

  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },

  /**
   * PEGAR TRANSAÇÕES
   * @param {Object} input -
   * @param {string} input.from - Data inicial da transação
   * @param {date} input.to - Data limite da transação
   */

  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`, {
      name: input.name,
      amount: input.amout,
      date: input.date,
      type: input.type,
    })
    return response.data
  },

  /**
   * EDITAR TRANSAÇÃO
   * @param {Object} input - Dados da transação
   * @param {string} input.id - Id da transação
   * @param {string} input.name - Nome da transação
   * @param {date} input.date - Data da transação - YYYY/MM/DD
   * @param {number} input.amount - Valor da transação - BRL
   * @param {string} input.type - tipo da transação ['EARNING', 'EXPENSE', 'INVESTMENT']
   */

  update: async (input) => {
    const response = await protectedApi.patch(`/transactions/me?${input.id}`, {
      name: input.name,
      amount: input.amount,
      date: input.date,
      type: input.type,
    })
    return response.data
  },
}

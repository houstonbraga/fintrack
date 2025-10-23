import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionServices = {
  /**
   * ADICIONAR TRANSAÇÃO
   * @param {Object} input
   * @param {string} input.name - Nome da transação
   * @param {date} input.date - Data da transação - YYYY/MM/DD
   * @param {number} input.amount - Valor da transação - BRL
   * @param {string} input.type - tipo da transação ['EARNING', 'EXPENSE', 'INVESTMENT']
   */

  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },

  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
}

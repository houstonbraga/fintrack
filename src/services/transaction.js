import { protectedApi } from '@/lib/axios'

export const TransactionServices = {
  /**
   *
   * @param {Object} input
   * @param {string} input.name - Nome da transação
   * @param {date} input.date - Data da transação - YYYY/MM/DD
   * @param {number} input.amount - Valor da transação - BRL
   * @param {string} input.type - ['EARNING', 'EXPENSE', 'INVESTMENT']
   */

  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}

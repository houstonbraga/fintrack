import { protectedApi, publicApi } from '@/lib/axios'

export const UserServices = {
  /**
   * criar usuário
   *
   * @param {Object} input
   * @param {string} input.first_name - primeiro nome do usuário
   * @param {string} input.last_name - sobrenome do usuário
   * @param {string} input.email - email do usuário
   * @param {string} input.password - senha do usuário
   * @returns {Object} User criado
   * @returns {string} response.tokens - tokens
   */

  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * Fazer login
   *
   * @param {Object} input
   * @param {string} input.email - email do usuário
   * @param {string} input.password - senha do usuário
   * @returns {Object} usuário logado
   * @returns {string} response.tokens - tokens
   */

  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * Retorna usuário autenticado
   *
   * @returns {Object} Usuário autenticado
   *
   */

  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    }
  },
}

import axios from 'axios'

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/keys-tokens'

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api', //api publica
})

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api', //api protegida com o token anexado
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
  if (!accessToken) {
    return request
  }
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
}) // codigo para enviar ao headers o JWT token

//PRECISAMOS FAZER ESSAS COISAS
//1 verificar se o código de erro é 401
//2 se o erro for 401, preciso verificar se existe o refreshToken
//3 se existir eu atualizo o accessToken e por fim refaço a requisição
protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
    if (!refreshToken) {
      return Promise.reject(error)
    }
    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true
      try {
        const response = await protectedApi.post('/users/refresh-token', {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, newAccessToken)
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, newRefreshToken)
        request.headers.Authorization = `Bearer ${newAccessToken}`
        return protectedApi(request)
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN) //em caso de erro após 2 tentativas, remover os tokens
        console.error(refreshError)
      }
      return Promise.reject(error)
    }
  }
)

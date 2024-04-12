import axios from "axios"
import { Review, Pagination, CreateOrderParams, ProductsResponse, CreateOrderResult } from './types'

export const createApiClient = () => {
  const client = axios.create({
    baseURL: 'http://o-complex.com:1337'
  })

  return {
    async getReviews() {
      const { data } = await client.get<Review[]>('/reviews')

      return data
    },
    async getProducts({ page, pageSize }: Pagination) {
      const { data } = await client.get<ProductsResponse>('/products', {
        params: {
          page,
          page_size: pageSize
        }
      })

      return data
    },
    async createOrder(params: CreateOrderParams) {
      const { data } = await client.post<CreateOrderResult>('/order', params)

      return data
    }
  }
}

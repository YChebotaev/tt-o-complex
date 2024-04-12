export type Pagination = {
  page: number
  pageSize: number
}

export type ProductsResponse = {
  page: string
  amount: number
  total: number
  products: Product[]
}

export type Product = {
  id: number
  image_url: string
  title: string
  description: string
  price: number
}

export type Review = {
  id: number
  text: string
}

export type OrderCartItem = {
  id: number
  quantity: number
}

export type CreateOrderParams = {
  phone: string
  cart: OrderCartItem[]
}

export type CreateOrderResult = {
  success: 1 | 0,
  error?: string
}

// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import OrderService from '#services/order_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  async store({ request, params, auth }: HttpContext) {
    try {
      return await this.orderService.createOrder(
        auth.user as User,
        params.productId,
        request.body()
      )
    } catch (error) {
      throw error
    }
  }
}

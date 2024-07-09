// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import OrderService from '#services/order_service'
import { createOrderValidator } from '#validators/order'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  async store({ request, auth }: HttpContext) {
    try {
      const payload = await createOrderValidator.validate(request.body())
      return await this.orderService.createOrder(
        auth.user as User,
        payload
      )
    } catch (error) {
      throw error
    }
  }

  async index() {
    try {
      return await this.orderService.findAll()
    } catch (error) {
      throw error
    }
  }
}

import Order from '#models/order'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import { DatabaseService } from './database_service.js'
import OrderProductService from './order_product_service.js'

@inject()
export default class OrderService extends DatabaseService<typeof Order> {
  constructor(private readonly orderProductService: OrderProductService) {
    super(Order)
  }

  async createOrder(user: User, data: any) {
    if (!user) {
      throw new Error('This user is undefined')
    }
    const order = await this.store({
      totalPrice: 0,
      address: data.address ? data.address : user.address,
      userId: user.id,
    })
    try {
      for (let product of data.product_data) {
        const order_product = await this.orderProductService.createOrderProduct(
          product.id,
          product.quantity
        )
        order.totalPrice += order_product.price
        order.related('order_product').save(order_product)
        order_product.related('order').associate(order)
      }
  
      return await order.save()
    } catch (error) {
      await order.delete()
      throw error
    }
  }
}

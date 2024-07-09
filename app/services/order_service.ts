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

  async createOrder(user: User, productId: string, data: any ){
    if(!user){
        throw new Error('This user is undefined')
    }
    const order_product = await this.orderProductService.createOrderProduct(productId, data.quantity)
    const order = await this.store({
        totalPrice: order_product.price,
        address: data.address ? data.address : user.address,
        userId: user.id
    })
    order.related('order_product').save(order_product)
    order_product.related('order').associate(order)
    return order
  }
}

import OrderProduct from '#models/order_product'
import { inject } from '@adonisjs/core'
import { DatabaseService } from './database_service.js'
import ProductService from './product_service.js'
import { ProductStatus } from '../../types/enum.js'

@inject()
export default class OrderProductService extends DatabaseService<typeof OrderProduct> {
  constructor(private readonly productService: ProductService) {
    super(OrderProduct)
  }

  async createOrderProduct(productId: string, quantity: number){
    const product = await this.productService.getProductById(productId)
    if(!product){
        throw new Error('This product is not existed or out of stock')
    }
    if(quantity > product.quantityInStock){
        throw new Error('This product is not enough for the quantity you want to buy')
    }
    const orderProduct = await this.store({
        productId: product.id,
        quantity: quantity,
        price: product.price * quantity
    })
    orderProduct.related('product').associate(product)
    product.related('order_product').save(orderProduct)
    product.quantityInStock = product.quantityInStock - quantity
    if(product.quantityInStock === 0){
        product.status = ProductStatus.out_of_stock
    }
    await product.save()
    return orderProduct
  }
}

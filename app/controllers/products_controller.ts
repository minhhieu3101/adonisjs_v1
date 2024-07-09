import Product from '#models/product'
import ProductPolicy from '#policies/product_policy'
import ProductService from '#services/product_service'
import { updateCategoryValidator } from '#validators/category'
import { createProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(
    protected productService: ProductService,
  ) {}

  async index({}: HttpContext): Promise<Product[]> {
    try {
      return await this.productService.findAll()
    } catch (error) {
      throw error
    }
  }

  async store({ bouncer, response, request }: HttpContext) {
    try {
      if (await bouncer.with(ProductPolicy).denies('store')) {
        return response.unauthorized({ message: 'Unauthorized' })
      }
      const data = request.body()
      data.picture = request.files('picture')
      data.quantityInStock = parseInt(data.quantityInStock)
      data.price = parseInt(data.price)
      const payload = await createProductValidator.validate(data)
      return await this.productService.store(payload)
    } catch (error) {
      throw error
    }
  }

  async show({ params }: HttpContext) {
    try {
      return await this.productService.findById(params.id)
    } catch (error) {
      throw error
    }
  }

  async getPictureoOfProduct({ params }: HttpContext) {
    try {
      return await this.productService.getPictureFromProduct(params.pictureId)
    } catch (error) {
      throw error
    }
  }

  async getProductFromCategory({ params }: HttpContext) {
    try {
      return await this.productService.getProductFromCategory(params.categoryId)
    } catch (error) {
      throw error
    }
  }

  async showAll() {
    try {
      return await this.productService.showAll()
    } catch (error) {
      throw error
    }
  }

  async update({ bouncer, response, params, request }: HttpContext) {
    try {
      if (await bouncer.with(ProductPolicy).denies('update')) {
        return response.unauthorized({ message: 'Unauthorized' })
      }
      await updateCategoryValidator.validate(request.body())
      return await this.productService.update(params.id, request.body())
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, response, params }: HttpContext) {
    try {
      if (await bouncer.with(ProductPolicy).denies('destroy')) {
        return response.unauthorized({ message: 'Unauthorized' })
      }
      return await this.productService.destroy(params.id)
    } catch (error) {
      throw error
    }
  }
}

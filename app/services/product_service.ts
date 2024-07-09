import Product from '#models/product'
import { errors } from '@vinejs/vine'
import { DatabaseService } from './database_service.js'
import CategoryService from './category_service.js'
import { ModelStatus, ProductStatus } from '../../types/enum.js'
import cloudinary from '#config/cloudinary'
import Picture from '#models/picture'
import PictureService from './picture_service.js'
import { inject } from '@adonisjs/core'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

@inject()
export default class ProductService extends DatabaseService<typeof Product> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly pictureService: PictureService
  ) {
    super(Product)
  }

  async store(data: any): Promise<Product> {
    if (!data.quantityInStock || !data.price || data.quantityInStock < 0 || data.price < 0) {
      throw new errors.E_VALIDATION_ERROR('quantity in stock or price is invalid')
    }
    const category = await this.categoryService.findById(data.categoryId)
    if (!category || category.status !== ModelStatus.active) {
      throw new Error('Can not find this category')
    }
    if (data.quantityInStock === 0) {
      data.status = ProductStatus.out_of_stock
    }
    const files = data.picture
    delete data.categoryId
    delete data.picture
    data.picture = new Array()

    for (let file of files) {
      const upload_file = await cloudinary.uploader.upload(file.tmpPath as string, {
        folder: 'AdonisjsV1',
      })
      if (upload_file) {
        const picture = new Picture()
        picture.url = upload_file.url
        data.picture.push(picture)
        await upload_file.move(app.makePath('uploads'), {
          name: `${cuid()}.${upload_file.extname}`,
        })
      } else {
        console.log(`Picture file ${file} can not upload`)
      }
    }
    const product = await super.store(data)
    try {
      await product.related('picture').saveMany(data.picture)
      await product.related('category').associate(category)
      await category.related('products').save(product)
      return product
    } catch (error) {
      await product.delete()
      throw error
    }
  }

  async showAll() {
    return await super
      .getModel()
      .query()
      .preload('category', (categoryQuery) => {
        categoryQuery.where('status', ModelStatus.active)
      })
      .preload('picture')
      .where('status', ProductStatus.available)
  }

  async getPictureFromProduct(productId: string) {
    return await this.pictureService.getModel()
      .query()
      .preload('product', (productQuery) => {
        productQuery.where((query) => {
          query.where('product_id', productId).whereNot('status', ProductStatus.unavailable)
        })
      })
  }

  async getProductFromCategory(categoryId: string) {
    return await this.getModel()
      .query()
      .preload('category', (categoryQuery) => {
        categoryQuery.where((query) => {
          query.where('category_id', categoryId).where('status', ModelStatus.active)
        })
      })
      .where('status', ProductStatus.available)
  }

  async getProductById(productId: string) {
    return await this.getModel()
      .query()
      .preload('category', (categoryQuery) => {
        categoryQuery.where((query) => {
          query.where('status', ModelStatus.active)
        })
      })
      .where('id', productId)
      .where('status', ProductStatus.available)
      .first()
  }
}

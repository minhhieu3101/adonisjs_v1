import Product from '#models/product'
import { errors } from '@vinejs/vine'
import { DatabaseService } from './database_service.js'
import CategoryService from './category_service.js'
import { Status } from '../../types/enum.js'
import cloudinary from '#config/cloudinary'
import Picture from '#models/picture'
import PictureService from './picture_service.js'
import { inject } from '@adonisjs/core'

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
    if (!category) {
      throw new Error('Can not find this category')
    }
    if (data.quantityInStock === 0) {
      data.status = Status.out_of_stock
    }
    const files = data.picture
    delete data.categoryId
    delete data.picture
    data.picture = new Array()

    for (let file of files) {
      const upload_file = await cloudinary.uploader.upload(file.tmpPath as string, {
        folder: 'AdonisjsV1',
      })
      const picture = new Picture()
      picture.url = upload_file.url
      data.picture.push(picture)
    }
    const product = await super.store(data)
    try{
      await product.related('picture').saveMany(data.picture)
      await product.related('category').associate(category)
      await category.related('products').save(product)
      return product
    }catch(error){
      await product.delete()
      throw error
    }
  }

  async getPictureFromProduct(productId: string) {
    const product = await this.findById(productId)
    if(!product){
      throw new Error('Can not find this product')
    }
    return await this.pictureService.getPictureFromProduct(productId)
  }
}

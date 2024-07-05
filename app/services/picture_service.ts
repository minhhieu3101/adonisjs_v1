import Picture from '#models/picture'
import Product from '#models/product'
import { DatabaseService } from './database_service.js'

export default class PictureService extends DatabaseService<typeof Picture> {
  constructor() {
    super(Picture)
  }

  async getPictureFromProduct(productId: string): Promise<Picture[]> {
    return await this.getModel().findManyBy('productId', productId)
  }
}

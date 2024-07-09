import Category from '#models/category'
import { ModelStatus } from '../../types/enum.js'
import { DatabaseService } from './database_service.js'

export default class CategoryService extends DatabaseService<typeof Category> {
  constructor() {
    super(Category)
  }

  async showAll() {
    return this.getModel().findByOrFail('status', ModelStatus.active)
  }
}

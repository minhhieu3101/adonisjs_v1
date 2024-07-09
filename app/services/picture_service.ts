import Picture from '#models/picture'
import { DatabaseService } from './database_service.js'

export default class PictureService extends DatabaseService<typeof Picture> {
  constructor() {
    super(Picture)
  }
}

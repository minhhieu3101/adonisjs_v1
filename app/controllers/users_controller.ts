
import UsersService from '#services/user_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private readonly userService: UsersService){}
  /**
   * Display a list of resource
   */
  async index({pagination}: HttpContext) {
    try {
      return await this.userService.index(pagination)
    } catch (error) {
      throw error
    }
  }
  async show({ params }: HttpContext) {
    try {
      return await this.userService.findById(params.id)
    } catch(error){
      throw error
    }
  }

  async update({ params, request }: HttpContext) {
    try {
      return await this.userService.update(params.id, request.body())
    } catch (error) {
      throw error
    }
  }

  async edit({auth, request}: HttpContext) {
    try {
      return await this.userService.update(auth.user?.$original.id, request.body())
    } catch (error) {
      throw error
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      return await this.userService.destroy(params.id)
    } catch (error) {
      throw error
    }
  }
}
import HttpExceptionHandler from '#exceptions/handler';
import UsersService from '#services/user_service';
import { createUserValidator } from '#validators/user';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { messages } from '@vinejs/vine/defaults';

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
      throw new HttpExceptionHandler()
    }
  }

  /**
   * Display form to create a new record
   */
  async create({request}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
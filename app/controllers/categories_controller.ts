import Category from '#models/category';
import CategoryPolicy from '#policies/category_policy';
import CategoryService from '#services/category_service';
import { createCategoryValidator, updateCategoryValidator } from '#validators/category';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CategoriesController {
  
  constructor(private readonly categoryService: CategoryService){}
  async index({}: HttpContext) : Promise<Category[]> {
    try {
      return await this.categoryService.findAll()
    } catch (error) {
      throw error
    }
  }

  async store({bouncer, response , request }: HttpContext) {
    try {
      if (await bouncer.with(CategoryPolicy).denies('store')) {
        return response.unauthorized({message: 'Unauthorized'})
      }

      const payload = await createCategoryValidator.validate(request.body())
      return await this.categoryService.store(payload)
    } catch (error) {
      throw error
    }
  }

  async show({ params }: HttpContext) {
    try {
      return await this.categoryService.findById(params.id)
    } catch (error) {
      throw error
    }
  }

  async update({bouncer, response, params, request }: HttpContext) {
    try {
      if (await bouncer.with(CategoryPolicy).denies('update')) {
        return response.unauthorized({message: 'Unauthorized'})
      }
      await updateCategoryValidator.validate(request.body())
      return await this.categoryService.update(params.id, request.body())
    } catch (error) {
      throw error
    }
  }

  async destroy({bouncer,response, params }: HttpContext) {
    try {
      if (await bouncer.with(CategoryPolicy).denies('destroy')) {
        return response.unauthorized({message: 'Unauthorized'})
      }
      return await this.categoryService.destroy(params.id)
    } catch (error) {
      throw error
    }
  }
}
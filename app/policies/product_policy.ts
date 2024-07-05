import User from '#models/user'
import Product from '#models/product'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { RoleEnum } from '../../types/enum.js'

export default class ProductPolicy extends BasePolicy {
    store(user: User): AuthorizerResponse {
        return user.role === RoleEnum.admin
    }

    update(user: User): AuthorizerResponse {
        return user.role === RoleEnum.admin
    }

    destroy(user: User): AuthorizerResponse {
        return user.role === RoleEnum.admin
    }
}
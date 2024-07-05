import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CategoriesController from '#controllers/categories_controller'
import ProductsController from '#controllers/products_controller'

//users
router.resource('/users', UsersController).apiOnly().except(['store', 'index'])
router.post('/register', [() => import('#controllers/auth_controller'), 'register'])
router
  .get('/users', [() => import('#controllers/users_controller'), 'index'])
  .use(middleware.pagination())
router.post('/login', [() => import('#controllers/auth_controller'), 'login'])

router
  .group(() => {
    router.resource('category', CategoriesController).apiOnly()
    router.resource('product', ProductsController).apiOnly()
  })
  .use(middleware.auth({ guards: ['api'] }))

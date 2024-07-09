import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CategoriesController from '#controllers/categories_controller'
import ProductsController from '#controllers/products_controller'
import OrdersController from '#controllers/orders_controller'

//authentication
router.post('/register', [() => import('#controllers/auth_controller'), 'register'])
router.post('/login', [() => import('#controllers/auth_controller'), 'login'])
router.post('verify', [() => import('#controllers/users_controller'), 'verifyUser'])

router
  .group(() => {
    router.resource('/users', UsersController).apiOnly().except(['store', 'index'])
    router
      .get('/users', [() => import('#controllers/users_controller'), 'index'])
      .use(middleware.pagination())
    router.resource('category', CategoriesController).apiOnly()
    router.resource('product', ProductsController).apiOnly()
    router.resource('order', OrdersController).apiOnly()
    router.get('/product/category/:categoryId', [
      () => import('#controllers/products_controller'),
      'getProductFromCategory',
    ])
    router.get('/products', [() => import('#controllers/products_controller'), 'showAll'])
    router.get('/product/picture/:pictureId', [
      () => import('#controllers/products_controller'),
      'getPictureoOfProduct',
    ])
  })
  .use(middleware.auth({ guards: ['api'] }))

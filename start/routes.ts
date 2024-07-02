
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//users
router.resource('/users' , UsersController).apiOnly().except(['store', 'index'])
router.post('/register' , [()=> import('#controllers/auth_controller') , 'register'])
router.get('/users' , [()=> import('#controllers/users_controller') , 'index']).use(middleware.pagination())
router.post('/login' , [()=> import('#controllers/auth_controller') , 'login'])
router
  .get('/', async (ctx) => {
    return ctx.auth.use('jwt').user
  })
  .use(middleware.auth())


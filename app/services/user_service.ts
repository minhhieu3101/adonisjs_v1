import User from '#models/user'
import env from '#start/env'
import db from '@adonisjs/lucid/services/db'
import { DatabaseService } from './database_service.js'
import mail from '@adonisjs/mail/services/main'
import { ModelStatus } from '../../types/enum.js'
export default class UsersService extends DatabaseService<typeof User> {
  constructor() {
    super(User)
  }
  async index(pagination: any) {
    const { perPage, page } = pagination
    const users = await db.from('users').paginate(page, perPage)
    return users
  }

  async verify(otp: number | string, email: string){
    const user = await this.getModel().findByOrFail('email', email)
    if(user.status === ModelStatus.active){
      throw new Error(`This email ${user.email} is already active`)
    }
    if(!user){
      throw new Error('Can not find this user')
    }
    if(user.otp != otp){
      throw new Error('This OTP is wrong')
    }
    user.status = ModelStatus.active
    await user.save()
    return {message: 'This user is active now'}
  }

  async register(payload: any) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString()
      await mail.send((message) => {
        message
          .to(payload.email)
          .from('info@example.org')
          .subject('Verify your email address')
          .html(`<p>Enter <b>${otp}</b> to verify your email address</p>`)
      })
      payload.otp = otp
      return await this.store(payload)
    } catch (error) {
      throw error
    }
  }

  async login(user: any): Promise<Object> {
    const { email, password } = user
    const userdb = await User.verifyCredentials(email, password)
    if(userdb.status !== ModelStatus.active){
      throw new Error('Can not find this user')
    }
    const accessToken = await User.accessTokens.create(userdb, [], {
      expiresIn: env.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    })
    return accessToken
  }
}

import User from "#models/user";
import env from "#start/env";
import db from '@adonisjs/lucid/services/db'
import { DatabaseService } from "./database_service.js";
export default class UsersService extends DatabaseService<typeof User> {
  constructor(){
    super(User)
  }
  async index(pagination: any) {
    const {perPage, page} = pagination
    const users = await db.from('users').paginate(page, perPage)
    return users
  }

  async login(user:any) : Promise<Object> {
    const {email, password} = user
    const userdb = await User.verifyCredentials(email, password)
    // const refreshToken = await redis.get(`user:${userdb.id}:refreshToken`)
    const accessToken = await User.accessTokens.create(userdb, [], {
      expiresIn: env.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    })
    return accessToken
    // if(refreshToken){
    //   return {
    //     accessToken: accessToken,
    //     refreshToken: refreshToken
    //   }
    // }else{
    //   const newRefreshToken = await User.accessTokens.create(userdb, [], {
    //     expiresIn: env.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
    //   })
    //   await redis.set(`user:${userdb.id}:refreshToken`, newRefreshToken.toJSON().token as string)
      
    // }
  }
}

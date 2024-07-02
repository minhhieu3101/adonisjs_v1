import User from "#models/user";
import db from '@adonisjs/lucid/services/db'
import { Authenticator } from "@adonisjs/auth";
import { Authenticators } from "@adonisjs/auth/types";

export default class UsersService {

  async index(pagination: any) {
    const {perPage, page} = pagination
    const users = await db.from('users').paginate(page, perPage)
    return users
  }

  async store(user: any): Promise<User> {
    return await User.create({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        address: user.address,
        phoneNumber: user.phoneNumber,
        dob: user.dob
    })
  }

  async login(user:any, auth: Authenticator<Authenticators>) : Promise<Object> {
    const {email, password} = user
    const userdb = await User.verifyCredentials(email, password)
    return await auth.use('jwt').generate(userdb)
  }

  /**
   * Show individual record
   */
  async show() {}

  /**
   * Edit individual record
   */
  async edit() {}

  /**
   * Handle form submission for the edit action
   */
  async update(info: any) {
  }

  /**
   * Delete record
   */
  async destroy() {}
}

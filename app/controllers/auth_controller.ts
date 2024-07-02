
import UsersService from "#services/user_service";
import { loginValidator, registerValidator } from "#validators/auth";
import { HttpContext } from "@adonisjs/core/http";
import { inject } from '@adonisjs/core';

@inject()
export default class AuthController {
    constructor(private readonly userService: UsersService){}
    
    async register({request} : HttpContext){
    try {
        const data = request.body()
        const payload = await registerValidator.validate(data)
        console.log('register');
        
        return await this.userService.store(payload)
    } catch (error) {
        console.log(error);
        
        throw error
        }
    }

    async login({request,auth} : HttpContext){
        try {
            const data = request.body()
            const payload = await loginValidator.validate(data)
            return await this.userService.login(payload, auth)
        } catch (error) {
            throw error
        }
    }
}
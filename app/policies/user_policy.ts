import { AuthorizerResponse } from "@adonisjs/bouncer/types";
import PolicyUtil from "./policy_util.js";
import User from "#models/user";
import { RoleEnum } from "../../types/enum.js";

export default class UserPolicy extends PolicyUtil {
    index(user: User): AuthorizerResponse {
        return user.role === RoleEnum.admin
    }
}
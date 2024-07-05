import Category from "#models/category";
import { DatabaseService } from "./database_service.js";

export default class CategoryService extends DatabaseService<typeof Category>{
    constructor(){
        super(Category)
    }
}
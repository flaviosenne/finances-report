import { UserModel } from "./user"

export interface CategoryModel {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string
    user: UserModel
}
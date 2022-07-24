import { CategoryModel } from "./category"
import { ReleaseType } from "./release-type"
import { ReleaseStatus } from "./release_status"
import { UserModel } from "./user"

export interface ReleaseModel {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string
    dueDate: Date
    status: ReleaseStatus
    type: ReleaseType
    value: number
    active: boolean
    category: CategoryModel
    user: UserModel
}
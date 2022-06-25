import { UserModel } from "../../../models/user";

export interface UserRepository {
    findAllActive(): Promise<UserModel[]>
}
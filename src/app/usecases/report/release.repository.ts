import { UserModel } from "../../../domain/models/user"
import { ReleaseModel } from "../../../domain/models/release"

export interface ReleaseRepository {
    findAllByUserId(id: string):Promise<ReleaseModel[]>

    findAllActive(): Promise<UserModel[]>
}
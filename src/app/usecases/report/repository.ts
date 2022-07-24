import { UserModel } from "../../../domain/models/user"
import { ReleaseModel } from "../../../domain/models/release"

export interface ReportRepository {
    findAllByUserId(id: string):Promise<ReleaseModel[]>

    findAllActive(): Promise<UserModel[]>
}
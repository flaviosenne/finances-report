import { ReleaseModel } from "../../../models/release";

export interface ReleaseRepository {
    findAllByUserId(id: string):Promise<ReleaseModel[]>
}
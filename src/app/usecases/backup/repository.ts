import { BackupVo } from "./backup.vo"

export interface BackupRepository {
    findAllUsersActive(): Promise<BackupVo[]>
}
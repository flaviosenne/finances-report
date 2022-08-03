import { BackupVo } from "../backup/backup.vo"

export interface RecoveryRepository {
    recoveryAllByUser(backup: BackupVo): Promise<void>

    existsUserById(userId: string): Promise<boolean>
    
    deleteAllByUserIdInCascate(userId: string): Promise<void>
}
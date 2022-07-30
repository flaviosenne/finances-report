
export interface RecoveryRepository {
    recoveryAllByUser(sql: string): Promise<void>

    existsUserById(userId: string): Promise<boolean>
    
    deleteAllByUserIdInCascate(userId: string): Promise<void>
}
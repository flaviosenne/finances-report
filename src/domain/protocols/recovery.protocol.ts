export interface RecoveryProtocol {
    proccess(userId: string): Promise<void>
}
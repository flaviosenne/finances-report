export interface BackupProtocol {
    run(): Promise<void>
}
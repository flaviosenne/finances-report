export interface BackupProtocol {
    generate(): Promise<void>
}
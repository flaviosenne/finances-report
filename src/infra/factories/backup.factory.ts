import { BackupImpl } from "../../app/usecases/backup"
import { BackupRepository } from "../../app/usecases/backup/repository"
import { BackupRepositoryPrismaImpl } from "../adapters/repositories/backup-repository-impl"

export const BackupFactory = () => {
    const repository: BackupRepository = new BackupRepositoryPrismaImpl()
    return new BackupImpl(repository)
}

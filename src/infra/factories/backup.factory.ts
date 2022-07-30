import { BackupImpl } from "../../app/usecases/backup"
import { BackupRepository } from "../../app/usecases/backup/repository"
import { FileProtocol } from "../../domain/protocols/file.protocol"
import { FileService } from "../adapters/file/filesystem"
import { BackupRepositoryPrismaImpl } from "../adapters/repositories/backup-repository-impl"

export const BackupFactory = () => {
    const repository: BackupRepository = new BackupRepositoryPrismaImpl()
    const file: FileProtocol = new FileService()
    return new BackupImpl(repository, file)
}

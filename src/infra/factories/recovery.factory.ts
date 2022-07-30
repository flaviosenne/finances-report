import { FileService } from "../adapters/file/filesystem"
import { RecoveryImpl } from "../../app/usecases/recovery"
import { FileProtocol } from "../../domain/protocols/file.protocol"
import { RecoveryRepository } from "../../app/usecases/recovery/repository"
import { RecoveryRepositoryMysqlImpl } from "../adapters/repositories/recovery-repository-impl"

export const RecoveryFactory = () => {
    const repository: RecoveryRepository = new RecoveryRepositoryMysqlImpl()
    const file: FileProtocol = new FileService()
    return new RecoveryImpl(repository, file)
}

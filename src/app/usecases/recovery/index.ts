import { join } from "path";
import { FileProtocol } from "../../../domain/protocols/file.protocol";
import { RecoveryProtocol } from "../../../domain/protocols/recovery.protocol";
import { RecoveryRepository } from "./repository";

const SQL_FILE_PATH = join(__dirname, '..', '..', '..', '..', 'backup')


export class RecoveryImpl implements RecoveryProtocol {

    constructor(private readonly repository: RecoveryRepository, 
        private readonly file: FileProtocol){}

    async proccess(userId: string): Promise<void> {

        const exists = await this.repository.existsUserById(userId)
        
        const sqls: string[] = (await this.file.readDirs(SQL_FILE_PATH)).map(files => {
            return files.replace('backup-','').replace('.sql', '')
        })
        
        const fileSqlOfUser = sqls.find(element => element == userId)
        
        if(fileSqlOfUser){
            exists && await this.repository.deleteAllByUserIdInCascate(userId)
            
            const sql = await this.file.readFile(fileSqlOfUser)

            await this.repository.recoveryAllByUser(sql.toString())
        }
        
    }

}
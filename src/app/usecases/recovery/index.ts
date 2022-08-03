import { join } from "path";
import { FileProtocol } from "../../../domain/protocols/file.protocol";
import { RecoveryProtocol } from "../../../domain/protocols/recovery.protocol";
import { RecoveryRepository } from "./repository";

const SQL_FILE_PATH = join(__dirname, '..', '..', '..', '..', 'backup')

export class RecoveryImpl implements RecoveryProtocol {

    constructor(private readonly repository: RecoveryRepository, 
        private readonly file: FileProtocol){}

    async proccess(userId: string): Promise<void> {
 
        const jsons: string[] = (await this.file.readDirs(SQL_FILE_PATH)).map(files => {
            return files.replace('.json', '')
        })
                
        const fileJsonOfUser = jsons.find(element => element == userId)
        
        
        if(fileJsonOfUser){
            const exists = await this.repository.existsUserById(userId)
            exists && await this.repository.deleteAllByUserIdInCascate(userId)
            
            const json = await this.file.readFile(`${SQL_FILE_PATH}/${fileJsonOfUser}.json`)

            await this.repository.recoveryAllByUser(JSON.parse(json.toString()))
        }
        
    }

}
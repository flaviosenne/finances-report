import { join } from 'path'
import { BackupVo } from "./backup.vo";
import { writeFileSync } from 'fs'
import { BackupProtocol } from "../../../domain/protocols/backup.protocol";
import { BackupRepository } from "./repository";
import { generateScriptUser } from "./generators/user";
import { generateScriptBank } from "./generators/bank";
import { generateScriptCategory } from "./generators/category";
import { generateScriptReleases } from "./generators/releases";
import { generateScriptUserCode } from "./generators/user-code";
import { FileProtocol } from '../../../domain/protocols/file.protocol';

const SQL_FILE_PATH = join(__dirname, '..', '..', '..', '..', 'backup')


export class BackupImpl implements BackupProtocol {

    constructor(private readonly repository: BackupRepository, 
        private readonly file: FileProtocol) { }

    async generate(): Promise<void> {
        const users: BackupVo[] = await this.repository.findAllUsersActive()

        users.forEach(backup => {
            const { codes, categories, banks, releases, ...user } = backup

            const sqlUser: string = generateScriptUser(user)

            const sqlUserCode: string = generateScriptUserCode(codes, user.id)

            const sqlCategory: string = generateScriptCategory(categories, user.id)

            const sqlBank: string = generateScriptBank(banks, user.id)

            const sqlReleases: string = generateScriptReleases(releases, user.id)

            const sql = `${sqlUser}\n${sqlUserCode}\n${sqlCategory}\n${sqlBank}\n${sqlReleases}`

            this.file.writeFile(`${SQL_FILE_PATH}/${user.id}.sql`, sql)
            
            this.file.writeFile(`${SQL_FILE_PATH}/${user.id}.json`, JSON.stringify(backup))

        })
    }



   

}
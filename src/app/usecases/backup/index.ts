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

const SQL_FILE_PATH = join(__dirname, '..', '..', '..', '..', 'public')


export class BackupImpl implements BackupProtocol {

    constructor(private readonly repository: BackupRepository) { }

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

            const date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`

            writeFileSync(`${SQL_FILE_PATH}/backup-${user.firstName}-${date}.txt`, sql, 'binary')

        })
    }



   

}
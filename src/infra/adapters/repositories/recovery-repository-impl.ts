import { BackupVo } from "../../../app/usecases/backup/backup.vo";
import { MysqlConnection } from "./mysql";
import { RecoveryRepository } from "../../../app/usecases/recovery/repository";
import { generateScriptBank } from "../../../app/usecases/backup/generators/bank";
import { generateScriptUserCode } from "../../../app/usecases/backup/generators/user-code";
import { generateScriptCategory } from "../../../app/usecases/backup/generators/category";
import { generateScriptReleases } from "../../../app/usecases/backup/generators/releases";

export class RecoveryRepositoryMysqlImpl implements RecoveryRepository {
    
    private connection: any

    constructor(){
        this.connection = new MysqlConnection()
    }

    async recoveryAllByUser(backup: BackupVo): Promise<void> {
        const { codes, categories, banks, releases} = backup
        
        await this.connection.execute(generateScriptUserCode(codes, backup.id))
        await this.connection.execute(generateScriptCategory(categories, backup.id))
        await this.connection.execute(generateScriptBank(banks, backup.id))
        await this.connection.execute(generateScriptReleases(releases, backup.id))
        
    }
    
    async existsUserById(userId: string): Promise<boolean> {
        const user = await this.connection.execute(`select * from custom_user where id = '${userId}' `)
    
        return user ? true : false
    }
    
    async deleteAllByUserIdInCascate(userId: string): Promise<void> {
        const sqls: string[] = []
        
        sqls.push(` delete from custom_release where user_id = '${userId}';`)
        sqls.push(` delete from bank where user_id = '${userId}';`)
        sqls.push(` delete from category where user_id = '${userId}';`)
        sqls.push(` delete from user_code where user_id = '${userId}';`)

        sqls.forEach(async sql => {
            await this.connection.execute(sql)
        })
    
    }

}
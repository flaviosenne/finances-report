import { MysqlConnection } from "./mysql";
import { RecoveryRepository } from "../../../app/usecases/recovery/repository";

export class RecoveryRepositoryMysqlImpl implements RecoveryRepository {
    
    private connection: any

    constructor(){
        this.connection = new MysqlConnection()
    }

    async recoveryAllByUser(sql: string): Promise<void> {
        await this.connection.execute(sql)
    }
    
    async existsUserById(userId: string): Promise<boolean> {
        const user = await this.connection.execute(`select * from custom_user where id = '${userId}' `)
    
        return user ? true : false
    }
    
    async deleteAllByUserIdInCascate(userId: string): Promise<void> {
        const sqls: string[] = []
        
        sqls.push(` delete from bank where user_id = '${userId}';`)
        sqls.push(` delete from bank where user_id = '${userId}';`)
        sqls.push(` delete from category where user_id = '${userId}';`)
        sqls.push(` delete from user_code where user_id = '${userId}';`)
        sqls.push(` delete from custom_user where id = '${userId}';`)

        sqls.forEach(async sql => {
            await this.connection.execute(sql)
        })
    
    }

}
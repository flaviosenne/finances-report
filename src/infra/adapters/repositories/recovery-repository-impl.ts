import { RecoveryRepository } from "../../../app/usecases/recovery/repository";
import { MysqlConnection } from "./mysql";

export class RecoveryRepositoryMysqlImpl implements RecoveryRepository {
    
    private connection: any

    constructor(){
        this.connection = new MysqlConnection()
    }

    async recoveryAllByUser(sql: string): Promise<void> {
        await this.connection.execute(sql)
    }
    
    async existsUserById(userId: string): Promise<boolean> {
        const user = await this.connection.execute(`select * from custom_user where id = ${userId}`)
    
        return user ? true : false
    }
    
    async deleteAllByUserIdInCascate(userId: string): Promise<void> {
        await this.connection.execute(`
            delete from custom_release where user_id = ${userId};
            delete from bank where user_id = ${userId};
            delete from category where user_id = ${userId};
            delete from user_code where user_id = ${userId};
            delete from custom_user where id = ${userId};
        `)
    
    }

}
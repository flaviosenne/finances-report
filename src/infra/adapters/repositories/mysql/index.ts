import { createConnection } from 'mysql2/promise'

export class MysqlConnection {

    private async getConnection() {
        return await createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user:process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        })
    }

    async execute(sql: string): Promise<any>{
        const connection = await this.getConnection()

        return await connection.execute(sql)
    }
}
import { UserCodeBackupVo } from "../backup.vo"
import { generateValueSql } from "./validator"

export const generateScriptUserCode = (codes: UserCodeBackupVo[], userId: string): string => {
    const sql = `
        insert into user_code (id, created_at, updated_at, code, is_valid, user_id)
            values ${codes.map(code => {
        return `
                (
                ${generateValueSql(code.id)},
                ${generateValueSql(code.createdAt)}, 
                ${generateValueSql(code.updatedAt)}, 
                ${generateValueSql(code.code)}, 
                ${generateValueSql(code.isValid)}, 
                ${generateValueSql(userId)} )`
    })
        };`

    return codes.length == 0 ? '' : sql

}
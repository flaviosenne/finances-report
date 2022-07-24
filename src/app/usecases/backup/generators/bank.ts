import { BankBackupVo } from "../backup.vo"
import { generateValueSql } from "./validator"

export const generateScriptBank = (banks: BankBackupVo[], userId: string): string => {
    const sql = `
    insert into bank (id, created_at, updated_at, description, is_active, image, user_id)
    values ${banks.map(bank => {
        return `
        (
        ${generateValueSql(bank.id)}, 
        ${generateValueSql(bank.createdAt)}, 
        ${generateValueSql(bank.updatedAt)}, 
        ${generateValueSql(bank.description)}, 
        ${generateValueSql(bank.isActive)}, 
        ${generateValueSql(bank.image)}, 
        ${generateValueSql(userId)} )`
    })
        };`

    return banks.length == 0 ? '' : sql

}

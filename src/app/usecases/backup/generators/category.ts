import { CategoryBackupVo } from "../backup.vo"
import { generateValueSql } from "./validator"

export const generateScriptCategory = (categories: CategoryBackupVo[], userId: string): string => {
    const sql = `
    insert into category (id, created_at, updated_at, description, is_active, image, user_id)
    values ${categories.map(category => {
        return `
        (
        ${generateValueSql(category.id)}, 
        ${generateValueSql(category.createdAt)}, 
        ${generateValueSql(category.updatedAt)}, 
        ${generateValueSql(category.description)}, 
        ${generateValueSql(category.isActive)}, 
        ${generateValueSql(category.image)}, 
        ${generateValueSql(userId)} )`
    })
        };`

    return categories.length == 0 ? '' : sql

}
import { BackupVo, UserBackupVo } from "../backup.vo";
import { generateValueSql } from "./validator";

export const generateScriptUser = (user: UserBackupVo) => {
    return `
        insert into custom_user (
        id, created_at, updated_at, email, 
        first_name, is_active, last_name, password) 
        values (
        ${generateValueSql(user.id)}, 
        ${generateValueSql(user.createdAt)}, 
        ${generateValueSql(user.updatedAt)}, 
        ${generateValueSql(user.email)}, 
        ${generateValueSql(user.firstName)}, 
        ${generateValueSql(user.isActive)}, 
        ${generateValueSql(user.lastName)}, 
        ${generateValueSql(user.password)} 
        );`
}
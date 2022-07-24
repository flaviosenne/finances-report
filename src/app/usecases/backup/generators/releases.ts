import { ReleaseBackupVo } from "../backup.vo"
import { generateValueSql } from "./validator"

export const generateScriptReleases = (releases: ReleaseBackupVo[], userId: string): string => {
    const sql = `
        insert into custom_release (id, created_at, updated_at, 
            description, active, due_date, status_release, type_release,
            value, category_id, user_id, bank_id)
        values ${releases.map(release => {
        return `
            (
            ${generateValueSql(release.id)},
            ${generateValueSql(release.createdAt)},
            ${generateValueSql(release.updatedAt)}, 
            ${generateValueSql(release.description)},
            ${generateValueSql(release.active)},
            ${generateValueSql(release.dueDate)}, 
            ${generateValueSql(release.status)},
            ${generateValueSql(release.type)},
            ${generateValueSql(release.value)}, 
            ${generateValueSql(release.category.id)}, 
            ${generateValueSql(release.bankId)}, 
            ${generateValueSql(userId)} ) `
    })
        };`

    return releases.length == 0 ? '' : sql

}

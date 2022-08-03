export const generateValueSql = (value: any) => {
    if(value === true) return true 
    return value ? `'${formatIfDate(value)}'` : value
}

const formatIfDate = (value: any) => {
    return value instanceof Date ? value.toISOString()
    .slice(0, 19).replace('T', ' ') : value    
}
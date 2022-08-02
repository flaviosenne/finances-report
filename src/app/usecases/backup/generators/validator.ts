export const generateValueSql = (value: any) => {
    return value ? `'${formatIfDate(value)}'` : value
}

const formatIfDate = (value: any) => {
    return value instanceof Date ? value.toISOString() : value    
}
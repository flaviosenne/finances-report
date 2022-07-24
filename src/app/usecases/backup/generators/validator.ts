export const generateValueSql = (value: any) => {
    return value ? `'${value}'` : value
}
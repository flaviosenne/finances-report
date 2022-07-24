export interface ExcelProtocol {
    generate(content: any): Promise<void>
}
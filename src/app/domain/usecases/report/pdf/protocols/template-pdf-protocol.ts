export interface TemplatePdfProtocol {
    generateTemplatePdf(content: any): Promise<string>
}
export interface TemplateAttachmentsInterface {
    filename: string
    content: any
}

export interface TemplateProtocol {
    generateTemplate(content: any): Promise<TemplateAttachmentsInterface>
}
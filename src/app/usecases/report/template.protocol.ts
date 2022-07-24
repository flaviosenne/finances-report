export interface TemplateInterface {
    filename: string
    content: any
}

export interface TemplateProtocol {
    generateTemplate(content: any): Promise<TemplateInterface>
}
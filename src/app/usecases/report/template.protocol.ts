import { TemplateAttachmentsProtocol } from "../../../domain/protocols/email.protocol";

export interface TemplateFileProtocol {
    generateTemplate(content: any): Promise<TemplateAttachmentsProtocol>
}

export interface TemplateContentProtocol {
    generateTemplate(content: any): Promise<string>
}
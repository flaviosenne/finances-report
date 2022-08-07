import { TemplateAttachmentsProtocol } from "../../../domain/protocols/email.protocol";

export interface TemplateProtocol {
    generateTemplate(content: any): Promise<TemplateAttachmentsProtocol>
}
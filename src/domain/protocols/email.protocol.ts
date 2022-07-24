import { TemplateAttachmentsInterface } from "../../app/usecases/report/template.protocol";

export interface EmailProtocol {
    send(templates: TemplateAttachmentsInterface[], to: string, username: string): Promise<void>
}
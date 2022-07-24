import { TemplateAttachmentsInterface } from "../../app/usecases/report/template.protocol";

export interface EmailProtocol {
    send(attachments: TemplateAttachmentsInterface[], to: string, username: string): Promise<void>
}
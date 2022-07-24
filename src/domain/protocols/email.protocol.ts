import { TemplateInterface } from "../../app/usecases/report/template.protocol";

export interface EmailProtocol {
    send(templates: TemplateInterface[], to: string, username: string): Promise<void>
}
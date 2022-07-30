import { transporter } from "../../config/smtp";
import { EmailProtocol } from "../../../domain/protocols/email.protocol";
import { TemplateAttachmentsInterface } from "../../../app/usecases/report/template.protocol";

const MAIL_FROM = 'facildespesa@gmail.com'

export class NodemailerImpl implements EmailProtocol {
    async send(attachments: TemplateAttachmentsInterface[], to: string, username: string): Promise<void> {
        
        await transporter.sendMail({
            from: `Despesa Facil <${MAIL_FROM}>`,
            to: `${username} <${to}>`,
            subject: "Relatório de lançamentos",
            html: '<p>Segue o relatório do mês</p>',
            attachments
        })
        .then(_ => console.log(`email send to ${to}`))
        .catch(err => console.log('error send email: ', err))
    }

}
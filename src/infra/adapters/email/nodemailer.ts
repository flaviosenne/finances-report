import { transporter } from "../../config/smtp";
import { EmailContentProtocol, EmailFileProtocol, TemplateAttachmentsProtocol } from "../../../domain/protocols/email.protocol";

const MAIL_FROM = 'facildespesa@gmail.com'

export class NodemailerImpl implements EmailContentProtocol, EmailFileProtocol {
    async sendFile(attachments: TemplateAttachmentsProtocol[], to: string, username: string): Promise<void> {
        
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

    async sendContent(content: any, subject: string,to: string, username: string): Promise<void> {
        
        await transporter.sendMail({
            from: `Despesa Facil <${MAIL_FROM}>`,
            to: `${username} <${to}>`,
            subject,
            html: content,
        })
        .then(_ => console.log(`email send to ${to}`))
        .catch(err => console.log('error send email: ', err))
    }

}
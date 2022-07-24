import { transporter } from "../../config/smtp";
import { EmailProtocol } from "../../../domain/protocols/email.protocol";
import { TemplateInterface } from "../report/imports";

const MAIL_FROM = 'facildespesa@gmail.com'

export class NodemailerImpl implements EmailProtocol {
    async send(templates: TemplateInterface[], to: string, username: string): Promise<void> {

        const attachments: any[] = templates.map(template => template.content)

        templates.forEach(template => {
            template.content.toBuffer(async (err: any, pdf: any) => {
                if (err) console.log('error in generate buffer of pdf', err)
                
                await transporter.sendMail({
                    from: `Despesa Facil <${MAIL_FROM}>`,
                    to: `${username} <${to}>`,
                    subject: "Relatório de lançamentos",
                    html: '<p>Segue o relatório do mês</p>',
                    attachments
                })
                .then(msg => console.log(`email send to ${to}`))
                .catch(err => console.log('error send email: ', err))
            })
        })
    }

}
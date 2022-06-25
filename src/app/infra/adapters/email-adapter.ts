import { EmailProtocol } from "../../domain/protocols/email-protocol";
import { transporter } from "../config/smtp";

const MAIL_FROM = 'facildespesa@gmail.com'

export class EmailAdapter implements EmailProtocol {
    async send(content: any, to: string): Promise<void> {
        await transporter.sendMail({
            from: `Despesa Facil <${MAIL_FROM}>`,
            to: `${to.split('@')[0]} <${to}>`,
            subject: "Relatório de lançamentos",
            html: '<p>Segue o relatório do mês</p>',
            attachments: [
                {
                    filename: 'relatorio-mensal.pdf',
                    content
                }
            ]
        })
        .then(msg => console.log(`email send to ${to}`))
        .catch(err => console.log('erro ao mandar email: ', err))
    }

}
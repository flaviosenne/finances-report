import { EmailProtocol } from "../../domain/protocols/email-protocol";
import { transporter } from "../config/smtp";

const MAIL_FROM = 'facildespesa@gmail.com'

export class EmailAdapter implements EmailProtocol {
    async send(content: any, to: string, username: string): Promise<void> {

        content.toBuffer(async (err: any, pdf: any) => {
            if (err) console.log('error in generate buffer of pdf', err)

            await transporter.sendMail({
                from: `Despesa Facil <${MAIL_FROM}>`,
                to: `${username} <${to}>`,
                subject: "Relatório de lançamentos",
                html: '<p>Segue o relatório do mês</p>',
                attachments: [
                    {
                        filename: 'relatorio-mensal.pdf',
                        content: pdf
                    }
                ]
            })
                .then(msg => console.log(`email send to ${to}`))
                .catch(err => console.log('error send email: ', err))
        })
    }

}
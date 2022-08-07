import { AccountProtocol, EmailDto } from "../../../domain/protocols/account.protocol";
import { AmqpProtocol } from "../../../domain/protocols/amqp.protocol";
import { EmailContentProtocol } from "../../../domain/protocols/email.protocol";
import { TemplateContentProtocol } from "../report/template.protocol";


export class AccountImpl implements AccountProtocol {
    
    constructor(private readonly amqp: AmqpProtocol, 
        private readonly email: EmailContentProtocol,
        private readonly template: {
            'activate-account': TemplateContentProtocol,
            'recovery-password': TemplateContentProtocol
        }){}

    async activeAccount(payload: any): Promise<void> {
        const dto: EmailDto = JSON.parse(payload)

        const content = await this.template['activate-account'].generateTemplate(dto)

        this.email.sendContent(content, 'Ativação da conta', dto.user.email, dto.user.firstName)
    }
    
    async redefinePassword(payload: any): Promise<void> {
        const dto: EmailDto = JSON.parse(payload)

        const content = await this.template['recovery-password'].generateTemplate(dto)

        this.email.sendContent(content, 'Redefinir senha', dto.user.email, dto.user.firstName)
    }

}
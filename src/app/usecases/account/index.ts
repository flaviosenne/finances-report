import { AccountProtocol, EmailDto } from "../../../domain/protocols/account.protocol";
import { AmqpProtocol } from "../../../domain/protocols/amqp.protocol";
import { EmailProtocol } from "../../../domain/protocols/email.protocol";

export class AccountImpl implements AccountProtocol {
    
    constructor(private readonly amqp: AmqpProtocol, 
        private readonly email: EmailProtocol){}

    async activeAccount(): Promise<void> {
        const dto : EmailDto = await this.amqp.consumeMessage('email', 'activate-account')
        console.log(dto)
    }
    
    async redefinePassword(): Promise<void> {
        const dto: EmailDto = await this.amqp.consumeMessage('email', 'redefine-password')
        console.log(dto)
    }

}
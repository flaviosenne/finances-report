import { AccountImpl } from "../../app/usecases/account"
import { RabbitmqImpl } from "../adapters/amqp/rabbitmq/rabbitmq"
import { AmqpProtocol } from "../../domain/protocols/amqp.protocol"
import { EmailProtocol } from "../../domain/protocols/email.protocol"
import { NodemailerImpl } from "../adapters/email/nodemailer"

export const AccountFactory = () => {
    const amqp: AmqpProtocol = new RabbitmqImpl()
    const email: EmailProtocol = new NodemailerImpl()
    return new AccountImpl(amqp, email)
}

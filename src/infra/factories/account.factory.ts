import { AccountImpl } from "../../app/usecases/account"
import { AmqpProtocol } from "../../domain/protocols/amqp.protocol"
import { NodemailerImpl } from "../adapters/email/nodemailer"
import { EmailContentProtocol } from "../../domain/protocols/email.protocol"
import { TemplateContentProtocol } from "../../app/usecases/report/template.protocol"
import { TemplateActivateAccountImpl } from "../adapters/templates/activate-account-adapter.template"
import { TemplateRecoveryPasswordImpl } from "../adapters/templates/recovery-password-adapter.template"

export const AccountFactory = (amqp: AmqpProtocol) => {
    const email: EmailContentProtocol = new NodemailerImpl()
    const activateAccount: TemplateContentProtocol = new TemplateActivateAccountImpl()
    const recoveryPassword: TemplateContentProtocol = new TemplateRecoveryPasswordImpl()
    const templates = {'activate-account': activateAccount, 'recovery-password': recoveryPassword}
    return new AccountImpl(amqp, email, templates)
}

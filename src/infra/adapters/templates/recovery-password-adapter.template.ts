import * as ejs from 'ejs'
import { join } from 'path'
import { TemplateContentProtocol } from '../../../app/usecases/report/template.protocol'
import { EmailDto } from '../../../domain/protocols/account.protocol'


const PATH_TEMPALTE = join(__dirname, '..', '..', '..', '..','public', 'mailTemplateRecoveryPassword.ejs')

export class TemplateRecoveryPasswordImpl implements TemplateContentProtocol {
    
    constructor(){}

    async generateTemplate(content: EmailDto): Promise<any> {
        return await ejs.renderFile(PATH_TEMPALTE, {
            'user':content.user,
            'code':content.code
        })
    }


}
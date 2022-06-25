import { ReportProtocol } from "../../../protocols/report-protocol";
import { TemplatePdfProtocol } from "./protocols/template-pdf-protocol";
import { EmailProtocol } from "../../../protocols/email-protocol";
import { UserRepository } from '../repository/user-repository'
import { ReleaseRepository } from '../repository/release-repository'
import { UserModel } from "../../../models/user";
import { ReleaseModel } from "../../../models/release";

export class ReportPdf implements ReportProtocol{
    constructor(
        private readonly email: EmailProtocol, 
        private readonly userRepository: UserRepository, 
        private readonly releaseRepository: ReleaseRepository,
        private readonly templatePdf: TemplatePdfProtocol){}
    
    async generate(): Promise<void> {

        const users: UserModel[] = await this.userRepository.findAllActive()

        users.forEach(async user => {
            
            const releases: ReleaseModel[] = await this.releaseRepository.findAllByUserId(user.id)

            const template: string = await this.templatePdf.generateTemplatePdf(releases)

            this.email.send(template, user.email, `${user.firstName} ${user.lastName}`)

        })

    }

}
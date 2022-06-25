import { ReportProtocol } from "../../../protocols/report-protocol";
import { TemplatePdfProtocol } from "./protocols/template-pdf-protocol";
import { EmailProtocol } from "../../../protocols/email-protocol";
import { UserRepository } from '../repository/user-repository'
import { ReleaseRepository } from '../repository/release-repository'
import { UserModel } from "../../../models/user";
import { ReleaseModel } from "../../../models/release";
import { ReleaseStatus } from "../../../models/release_status";
import { ReleaseType } from "../../../models/release-type";


export class ReportPdf implements ReportProtocol{
    constructor(
        private readonly email: EmailProtocol, 
        private readonly userRepository: UserRepository,
        private readonly releaseRepository: ReleaseRepository,
        private readonly templatePdf: TemplatePdfProtocol){}
    
    async generate(): Promise<void> {

        const users: UserModel[] = await this.userRepository.findAllActive()

        users.forEach(async user => {
            
            const releasesEntity: ReleaseModel[] = await this.releaseRepository.findAllByUserId(user.id)
            console.log(releasesEntity)
            // const releases: ReleaseModel[] = [
            //     {
            //         category: {
            //             id: 'id categoria',
            //             createdAt: new Date(),
            //             description: 'categoria 1', 
            //             updatedAt: new Date(), 
            //             user
            //         },
            //         createdAt: new Date(),
            //         description: 'conta de telone',
            //         dueDate: new Date(),
            //         id: 'id da conta',
            //         status: ReleaseStatus.PAID,
            //         type: ReleaseType.EXPENSE,
            //         value: 10,
            //         updatedAt: new Date(),
            //         user
            //     },
            //     {
            //         category: {
            //             id: 'id categoria 2',
            //             createdAt: new Date(),
            //             description: 'categoria 1', 
            //             updatedAt: new Date(), 
            //             user
            //         },
            //         createdAt: new Date(),
            //         description: 'conta de telone 2',
            //         dueDate: new Date(),
            //         id: 'id da conta',
            //         status: ReleaseStatus.PAID,
            //         type: ReleaseType.EXPENSE,
            //         value: 340.90,
            //         updatedAt: new Date(),
            //         user
            //     },
            //     {
            //         category: {
            //             id: 'id categoria 2',
            //             createdAt: new Date(),
            //             description: 'categoria 1', 
            //             updatedAt: new Date(), 
            //             user
            //         },
            //         createdAt: new Date(),
            //         description: 'salario',
            //         dueDate: new Date(),
            //         id: 'id da conta',
            //         status: ReleaseStatus.PAID,
            //         type: ReleaseType.RECEP,
            //         value: 1000,
            //         updatedAt: new Date(),
            //         user
            //     }
            // ]

            // const template = await this.templatePdf.generateTemplatePdf(releases)

            // this.email.send(template, user.email, `${user.firstName} ${user.lastName}`)

        })

    }

}
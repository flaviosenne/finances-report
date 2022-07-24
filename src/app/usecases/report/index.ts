import {
    ReleaseModel,
    UserModel,
    ReportProtocol,
    EmailProtocol,
    TemplateProtocol,
    TemplateAttachmentsInterface,
    ReportRepository
}
    from "./imports";

export class ReportImpl implements ReportProtocol {

    constructor(
        private readonly email: EmailProtocol,
        private readonly repository: ReportRepository,
        private readonly templates: TemplateProtocol[]) { }

    async generate(): Promise<void> {

        const users: UserModel[] = await this.repository.findAllActive()

        users.forEach(async user => {
            const releases: ReleaseModel[] = await this.repository.findAllByUserId(user.id)

            const attachments: TemplateAttachmentsInterface[] = await Promise.all(this.templates.map(async template => {
                return await template.generateTemplate(releases);
            }))

            this.email.send(attachments, user.email, `${user.firstName} ${user.lastName}`)

        })

    }

}
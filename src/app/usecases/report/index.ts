import { 
    ReleaseModel, 
    UserModel, 
    ReportProtocol, 
    EmailProtocol, 
    TemplateProtocol, 
    ReleaseRepository } 
    from "./imports";

export class ReportImpl implements ReportProtocol{

    constructor(
        private readonly email: EmailProtocol, 
        private readonly repository: ReleaseRepository,
        private readonly templates: TemplateProtocol[]){}
    
    async generate(): Promise<void> {

        const users: UserModel[] = await this.repository.findAllActive()

        users.forEach(async user => {
            
            const releases: ReleaseModel[] = await this.repository.findAllByUserId(user.id)

            const content: any[] = []
            this.templates.forEach(async template => {
                
                content.push(await template.generateTemplate(releases))
            })
            
            this.email.send(content, user.email, `${user.firstName} ${user.lastName}`)


        })

    }

}
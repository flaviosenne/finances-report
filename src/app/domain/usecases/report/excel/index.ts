import { EmailProtocol } from "../../../protocols/email-protocol";
import { ReportProtocol } from "../../../protocols/report-protocol";

export class ReportExcel implements ReportProtocol{
    
    constructor(private readonly email: EmailProtocol){}
    
    async generate(): Promise<string> {
        console.log('starting generate excel...')
        return new Promise<string>(resolve => {
            setTimeout(()=> {
                resolve('content')
            }, 5000)
        }).then(res => {
            console.log('finish generate excel')
            this.email.send(res, '', '')
            return res
        })

    }

}
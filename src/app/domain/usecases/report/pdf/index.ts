import { EmailProtocol } from "../../../protocols/email-protocol";
import { ReportProtocol } from "../../../protocols/report-protocol";

export class ReportPdf implements ReportProtocol{
    constructor(private readonly email: EmailProtocol){}
    
    async generate(): Promise<string> {
        console.log('starting generate pdf...')
        return new Promise<string>(resolve => {
            setTimeout(()=> {
                resolve('content')
            }, 3000)
        }).then(res => {
            console.log('finish generate pdf')
            this.email.send(res, '', '')
            return res
        })
    }

}
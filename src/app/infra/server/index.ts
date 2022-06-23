import {createServer, IncomingMessage, ServerResponse } from 'http'
import '../schedule/send-report-to-email'

const PORT = process.env.PORT || 3000

export class Server {
    
    static run() {
   
        createServer((req: IncomingMessage, res: ServerResponse)=> { 
            res.end()
        }).listen(() =>console.info(`Server finances reobot it is running in port ${PORT}`))

    }
}
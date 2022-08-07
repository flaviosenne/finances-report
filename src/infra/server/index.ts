import {createServer, IncomingMessage, ServerResponse } from 'http'
import '../schedule/send-report-to-email'
import '../schedule/generate-backup'
import '../schedule/recovery-backup'
import { RabbitmqImpl } from '../adapters/amqp/rabbitmq/rabbitmq'


const PORT = process.env.PORT || 3000

export class Server {
    
    static run() {
   
        createServer((req: IncomingMessage, res: ServerResponse)=> { 
            res.end()
        }).listen(() =>{
            console.info(`Server finances robot it is running in port ${PORT}`)
            new RabbitmqImpl()
        })

    }
}
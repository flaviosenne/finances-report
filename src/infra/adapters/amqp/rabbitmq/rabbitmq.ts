import {connect, Connection, Channel, Options, ConsumeMessage} from 'amqplib'
import { AmqpProtocol } from "../../../../domain/protocols/amqp.protocol";
import { rabbitmqCredentials } from "../../../config/rabbitmq";
import { AccountFactory } from "../../../factories/account.factory";


export class RabbitmqImpl implements AmqpProtocol {

    private uri: string = rabbitmqCredentials.uri
    private connection: Connection = null
    private channel: Channel = null

    constructor() {
        this.initialize()
    }

    async publishMessage(content: any, exchange: string): Promise<void> {
        this.channel.publish(exchange, '', Buffer.from(content))
    }

    async consumeMessage(queue: string, exchange: string, handleMessage: any): Promise<any> {
        const options: Options.Consume = {
            noAck: true,
        }

        return this.channel.consume(queue, this.consumer(exchange, handleMessage), options)
    }

    private consumer(exchange: string, handleMessage: any ) {
        return (msg: ConsumeMessage): void => {
            return msg && msg.fields.exchange == exchange ?
            handleMessage(JSON.parse(msg.content.toString())): null
        }
    }

    private async initialize() {
       try{
           this.connection = await this.getConnection()
           this.channel = await this.connection.createChannel()
           
           // queues avaliables
           this.createQueues(this.channel)
           this.createExchanges(this.channel)
           this.bindingQueuesWithExchanges(this.channel)
           
           // queues listeners
           this.consumeMessage('email', 'activate-account', AccountFactory(this).activeAccount.bind(AccountFactory(this)))
           this.consumeMessage('email', 'recovery-password', AccountFactory(this).redefinePassword.bind(AccountFactory(this)))
           
           console.info('Rabbitmq initialize with success')
           
        }catch(error){
            console.info('Error initialize Rabbitmq: ', error.message)
        }
        
    }

    private async getConnection(): Promise<Connection> {
        await this.disconnect()
        return await connect(this.uri)
    }

    private async disconnect(): Promise<void> {
        if (this.connection) {
            this.connection.close()
        }
    }

    private createQueues(channel: Channel){
        channel.assertQueue('email')
    }

    private async createExchanges(channel: Channel){
        channel.assertExchange('activate-account', 'topic', {durable: true})
        channel.assertExchange('recovery-password', 'topic', {durable: true})
    }

    
    private async bindingQueuesWithExchanges(channel: Channel){
        channel.bindQueue('email', 'activate-account', '')
        channel.bindQueue('email', 'recovery-password', '')
    }


}
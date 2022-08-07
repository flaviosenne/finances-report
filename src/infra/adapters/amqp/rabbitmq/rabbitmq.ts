import { AmqpProtocol } from "../../../../domain/protocols/amqp.protocol";
import * as client from 'amqplib'
import { rabbitmqCredentials } from "../../../config/rabbitmq";


export class RabbitmqImpl implements AmqpProtocol {

    private exchange: string = 'topic'
    private uri: string = rabbitmqCredentials.uri
    private connection: client.Connection = null
    private channel: client.Channel = null

    constructor() {
        this.initialize()
    }

    async publishMessage(content: any, routinKey: string): Promise<void> {
        this.channel.publish(this.exchange, routinKey, Buffer.from(content))
    }

    async consumeMessage(queue: string, routinKey: string): Promise<any> {
        const options: client.Options.Consume = {
            noAck: true,
        }

        return this.channel.consume(queue, this.consumer(routinKey), options)
    }

    private consumer(exchange: string) {
        return (msg: client.ConsumeMessage): void => {
            console.log(msg)
            console.log(msg.fields)
            console.log(msg.content)
            return msg && msg.fields.exchange == exchange ?
            JSON.parse(msg.content.toString()):
            null
        }
    }

    private async initialize() {
        this.connection = await this.getConnection()
        this.channel = await this.connection.createChannel()
        
        // queues avaliables
        this.channel.assertQueue('email')
        
        this.channel.assertExchange('activate-account', 'topic', {durable: true})
        this.channel.assertExchange('redefine-password', 'topic', {durable: true})
        
        this.channel.bindQueue('email', 'activate-account', '')
        this.channel.bindQueue('email', 'recovery-password', '')
        
    }

    private async getConnection(): Promise<client.Connection> {
        await this.disconnect()
        return await client.connect(this.uri)
    }

    private async disconnect(): Promise<void> {
        if (this.connection) {
            this.connection.close()
        }
    }


}
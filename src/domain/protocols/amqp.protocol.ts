export interface AmqpProtocol {
    
    publishMessage(content: any, routinKey: string): Promise<void>
    
    consumeMessage(queue: string, routinKey: string): Promise<any>
}
export interface AmqpProtocol {
    
    publishMessage(content: any, routinKey: string): Promise<void>
    
    consumeMessage(queue: string, routinKey: string, handleMessage: Function): Promise<any>
}
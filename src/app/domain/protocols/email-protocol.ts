export interface EmailProtocol {
    send(content: any, to: string): Promise<void>
}
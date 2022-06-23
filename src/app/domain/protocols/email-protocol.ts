export interface EmailProtocol {
    send(content: any, from: string, to: string): Promise<void>
}
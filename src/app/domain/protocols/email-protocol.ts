export interface EmailProtocol {
    send(content: any, to: string, username: string): Promise<void>
}
export interface TemplateAttachmentsProtocol {
    filename: string
    content: any
}

export interface EmailProtocol {
    send(attachments: TemplateAttachmentsProtocol[], to: string, username: string): Promise<void>
}
export interface TemplateAttachmentsProtocol {
    filename: string
    content: any
}

export interface EmailFileProtocol {
    sendFile(attachments: TemplateAttachmentsProtocol[], to: string, username: string): Promise<void>
}


export interface EmailContentProtocol {
    sendContent(content: any, subject: string,to: string, username: string): Promise<void>
}
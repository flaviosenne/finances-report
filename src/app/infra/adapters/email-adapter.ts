import { EmailProtocol } from "../../domain/protocols/email-protocol";

export class EmailAdapter implements EmailProtocol {
    send(content: any, from: string, to: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
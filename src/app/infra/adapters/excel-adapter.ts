import { ExcelProtocol } from "../../domain/protocols/excel-protocol";

export class ExcelAdapter implements ExcelProtocol {
    generate(content: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
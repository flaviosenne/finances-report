import { FileProtocol } from "../../../domain/protocols/file.protocol";
import {writeFileSync, readFileSync, unlinkSync, readdirSync} from 'fs'

export class FileService implements FileProtocol {

    async readDirs(path: string): Promise<string[]> {
        return readdirSync(path)
    }
    
    async readFile(path: string): Promise<Buffer> {
        return readFileSync(path) 
    }

    async writeFile(path: string, content: any): Promise<void> {
        writeFileSync(path, content, 'binary')
    }

    async deleteFile(path: string): Promise<void> {
        unlinkSync(path)
    }

}
export interface FileProtocol {
    readFile(path: string): Promise<Buffer>
        
    writeFile(path: string, content: any): Promise<void>
    
    readDirs(path: string): Promise<string[]>
    
    deleteFile(path: string): Promise<void>
}
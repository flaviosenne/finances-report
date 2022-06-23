export interface ReportProtocol {
    generate(): Promise<string>
}
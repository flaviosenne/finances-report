import * as json2xls from 'json2xls'
import { join } from 'path'
import { ReleaseModel } from '../../../domain/models/release'
import { FileProtocol } from '../../../domain/protocols/file.protocol'
import { TemplateProtocol } from '../../../app/usecases/report/template.protocol'


const XLSX_FILE_PATH = join(__dirname, '..', '..', '..','..', 'public', 'relatorio-mensal.xlsx')

export class TemplateReportExcelImpl implements TemplateProtocol {
    
    constructor(private readonly file: FileProtocol){}

    async generateTemplate(content: any): Promise<any> {
        return await this.getTemplateReportExcel(content)
    }

        
    private async getTemplateReportExcel(releases: any): Promise<any> {

        const releasesFormatted = releases.map((release: ReleaseModel) => {
            return {
                'Tipo': release.type,
                'Data': new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(release.dueDate),
                'Status': release.status,
                'Descrição': release.description,
                'Categoria': release.category.description,
                'Valor': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(release.value)
            }
        })

        const excel = json2xls(releasesFormatted)

        await this.file.writeFile(XLSX_FILE_PATH, excel)

        const content = await this.file.readFile(XLSX_FILE_PATH)

        await this.file.deleteFile(XLSX_FILE_PATH)

        return { content, filename: 'relatório-mensal.xlsx'}
    }

}
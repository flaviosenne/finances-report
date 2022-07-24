import * as json2xls from 'json2xls'
import { 
    join,
    unlinkSync, 
    ReleaseModel,
    readFileSync,
    writeFileSync, 
    TemplateProtocol,
}from './imports'

const XLSX_FILE_PATH = join(__dirname, '..', '..', '..', 'templates', 'relatorio-mensal.xlsx')

export class TemplateReportExcelImpl implements TemplateProtocol {
    
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
                'Categoria': release.category,
                'Valor': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(release.value)
            }
        })

        const excel = json2xls(releasesFormatted)

        writeFileSync(XLSX_FILE_PATH, excel, 'binary')

        const content = readFileSync(XLSX_FILE_PATH)

        unlinkSync(XLSX_FILE_PATH)

        return { content, filename: 'relatório-mensal.xlsx'}
    }

}
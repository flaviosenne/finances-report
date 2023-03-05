import * as ejs from 'ejs'
import { join } from 'path'
import { create } from 'html-pdf'
import { ReleaseType } from '../../../domain/models/release-type'
import { ReleaseModel } from '../../../domain/models/release'
import { TemplateFileProtocol } from '../../../app/usecases/report/template.protocol'
import { TemplateAttachmentsProtocol } from '../../../domain/protocols/email.protocol'
import { getFrequency, TypeFrequency } from '../../../app/usecases/utils/frequency'


const PATH_TEMPALTE = join(__dirname, '..', '..', '..', '..', 'public', 'mailTemplateReport.ejs')

export class TemplateReportPdfImpl implements TemplateFileProtocol {

    async generateTemplate(content: any): Promise<TemplateAttachmentsProtocol> {
        return await this.getTemplateReportPdf(content)
    }

    private async getTemplateReportPdf(releases: ReleaseModel[]) {


        return new Promise<TemplateAttachmentsProtocol>(async resolve => {

            const expenses = releases.filter(release => release.type == ReleaseType.EXPENSE)
            const receps = releases.filter(release => release.type == ReleaseType.RECEP)
            
            const category = await getFrequency(releases, TypeFrequency.CATEGORY)
            const expensesByPeriod = await getFrequency(expenses, TypeFrequency.EXPENSE)
            const recepsByPeriod = await getFrequency(receps, TypeFrequency.RECEP)

            const username = releases
                .map(release => `${release.user.firstName} ${release.user.lastName}`)
                .reduce((name: string, element): string => element)

            let totalExpense = 0
            let totalRevenue = 0

            expenses.forEach(expense => {
                return totalExpense += Number(expense.value)
            })

            receps.forEach(recep => {
                return totalRevenue += Number(recep.value)
            })

            const formatValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            const formatDate = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })

            const template = await ejs.renderFile(PATH_TEMPALTE, {
                'releases': releases,
                'username': username,
                'today': new Date(),
                'situation': (totalRevenue - totalExpense) >= 0 ? 'POSITIVO' : 'NEGATIVO',
                'situationPercent': ((totalExpense / totalRevenue) * 100).toFixed(2) + '%',
                'totalRecep': totalRevenue,
                'totalExpense': totalExpense,
                'total': (totalRevenue - totalExpense),
                'formatValue': formatValue,
                'formatDate': formatDate,
                'category': category['categories'],
                'frequency': category['frequency'],
                'periodExpense': expensesByPeriod['period'],
                'frequencyExpense': expensesByPeriod['frequency'],
                'periodRevenue': recepsByPeriod['period'],
                'frequencyRevenue': recepsByPeriod['frequency']
            })

            create(template, { format: 'A3' }).toBuffer((err: any, result: any) => {
                if (err) console.log('error in generate buffer of pdf', err)

                resolve({ content: result, filename: 'relatório-mensal.pdf' })
            })

        })
    }
}
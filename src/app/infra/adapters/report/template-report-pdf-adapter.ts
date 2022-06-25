import { ReleaseModel } from "../../../domain/models/release";
import { TemplatePdfProtocol } from "../../../domain/usecases/report/pdf/protocols/template-pdf-protocol";
import ejs from 'ejs'
import { join } from 'path'
import htmlPdf from 'html-pdf'
// import '../../../../templates'
import { ReleaseType } from "../../../domain/models/release-type";

const PATH_TEMPALTE = join(__dirname, '..', '..', '..', '..', 'templates', 'mailTemplateReport.ejs')

export class TemplateReportPdfAdapter implements TemplatePdfProtocol{
    async generateTemplatePdf(content: any): Promise<string> {
        const tempate = await this.getTemplateReport(content)
        console.log(tempate)
        return tempate
    }
    
    private async getTemplateReport(releases: ReleaseModel[]) {
 

        // const category = await postingsService.frequencyCategory(postings)
        // const expensesPeriod = await postingsService.frequencyExpenses(postings)
        // const revenuesPeriod = await postingsService.frequencyRevenues(postings)
        // const expensesPeriodTwelveMonth = await postingsService.frequencyExpenses(postingsTwelveMonth)
        // const revenuesPeriodTwelveMonth = await postingsService.frequencyRevenues(postingsTwelveMonth)

        const username = releases
        .map(release => `${release.user.firstName} ${release.user.lastName}`)
        .reduce((name: string, element): string => element )

        const expenses = releases.filter(release => release.type == ReleaseType.EXPENSE)
        const receps = releases.filter(release => release.type == ReleaseType.RECEP)
        
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

        return await ejs.renderFile(PATH_TEMPALTE, {
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
            // 'category': category['categories'],
            // 'frequency': category['frequency'],
            // 'periodExpense': expensesPeriod['period'],
            // 'frequencyExpense': expensesPeriod['frequency'],
            // 'periodRevenue': revenuesPeriod['period'],
            // 'frequencyRevenue': revenuesPeriod['frequency'],
            // 'periodExpenseTwelveMonth': expensesPeriodTwelveMonth['period'],
            // 'frequencyExpenseTwelveMonth': expensesPeriodTwelveMonth['frequency'],
            // 'periodRevenueTwelveMonth': revenuesPeriodTwelveMonth['period'],
            // 'frequencyRevenueTwelveMonth': revenuesPeriodTwelveMonth['frequency'],

        })
    }
}
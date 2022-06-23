import {scheduleJob} from 'node-schedule'
import { ReportExcel } from '../../domain/usecases/report/excel'
import { ReportPdf } from '../../domain/usecases/report/pdf'
import { EmailAdapter } from '../adapters/email-adapter'

const SCHEDULE_TIME =  process.env.SCHEDULE_TIME || ''

scheduleJob(SCHEDULE_TIME, async () => {

    console.log('schedule send report in email all users')

    const email = new EmailAdapter()
       
    const excelReport = await new ReportExcel(email).generate()
    const pdfReport = await new ReportPdf(email).generate()
    
})
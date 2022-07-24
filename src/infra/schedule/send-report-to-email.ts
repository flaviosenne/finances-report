import {scheduleJob} from 'node-schedule'
import { ReportPdfAndExcelFactory } from '../factories/report.factory'

const SCHEDULE_TIME =  process.env.SCHEDULE_TIME || ''

scheduleJob(SCHEDULE_TIME, async () => {

    console.log('schedule send report pdf and excel to email all users')

    await ReportPdfAndExcelFactory().generate()
    
})
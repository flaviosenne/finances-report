import {scheduleJob} from 'node-schedule'
import { getReportPdfInstance } from './factories/report-pdf'

const SCHEDULE_TIME =  process.env.SCHEDULE_TIME || ''

scheduleJob(SCHEDULE_TIME, async () => {

    console.log('schedule send report in email all users')


    await getReportPdfInstance().generate()
       
    
})
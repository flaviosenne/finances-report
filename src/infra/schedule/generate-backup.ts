import {scheduleJob} from 'node-schedule'
import { BackupFactory } from '../factories/backup.factory'

const SCHEDULE_TIME =  process.env.SCHEDULE_BACKUP_TIME || ''

scheduleJob(SCHEDULE_TIME, async () => {

    console.log('schedule generate backups of users')

    await BackupFactory().generate()
    
})
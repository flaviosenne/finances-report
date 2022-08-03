import {scheduleJob} from 'node-schedule'
import { RecoveryFactory } from '../factories/recovery.factory'

const SCHEDULE_TIME =  process.env.SCHEDULE_RECOVERY_TIME || ''

scheduleJob(SCHEDULE_TIME, async () => {

    const userId = 'd35380a8-b030-42bc-ae29-70ae49346b72'

    console.log('schedule recovery backups of user by id: '+userId)

    await RecoveryFactory().proccess(userId)
    
})
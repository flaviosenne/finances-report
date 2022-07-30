import {scheduleJob} from 'node-schedule'
import { RecoveryFactory } from '../factories/recovery.factory'

const SCHEDULE_TIME =  process.env.SCHEDULE_RECOVERY_TIME || ''

scheduleJob(SCHEDULE_TIME, async () => {

    const userId = '5af976ef-c689-4e3c-87bc-aa31b48b0b5d'

    console.log('schedule recovery backups of user by id: '+userId)

    await RecoveryFactory().proccess(userId)
    
})
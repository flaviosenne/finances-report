import dotenv from 'dotenv'
dotenv.config()
import {Server} from './infra/server'

Server.run()
import { AccountFactory } from "./account.factory"

export const AmqpFactory = () => {
    console.info('initialize queue with rabbitmq')
    AccountFactory()
}

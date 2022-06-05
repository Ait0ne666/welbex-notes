
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


interface Config {
    broker: string,
    topic: string,
    mailServiceAddress: string
}


const broker = process.env.BROKER
const topic = process.env.TOPIC
const mailServiceAddress = process.env.MAIL_SERVICE_ADDRESS

if (!broker || !topic || !mailServiceAddress) {
    throw new Error('Some environmental variables are missing')
}




export const config: Config = {
    broker,
    mailServiceAddress,
    topic
} 
import {Kafka} from 'kafkajs'
import { config } from './config'
import { mailController } from './controllers/mail.controller'








const kafka = new Kafka({
  clientId: 'notes',
  brokers: [config.broker],
})


const consumer = kafka.consumer({ groupId: 'mail' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: config.topic, fromBeginning: true,  })
  await consumer.run({
    eachMessage: async (e) => {
        consumer.pause([{topic: config.topic}])
        try {
            await mailController(e)
            
        } catch (err) {
            console.log(err)
            consumer.resume([{topic: config.topic}])
        }
    },

  })
}

run().catch(e => console.error(`[mail/consumer] ${e.message}`, e))

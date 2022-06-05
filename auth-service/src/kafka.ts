import { Kafka, Producer } from "kafkajs"
import config from "./config"

export const initKafka = async () => {
    const kafka = new Kafka({
        clientId: 'notes',
        brokers: [config.broker],
      })

    const producer = kafka.producer()

    await producer.connect()

    return producer
}
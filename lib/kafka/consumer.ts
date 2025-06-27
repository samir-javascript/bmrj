// lib/kafka/consumer.ts
import { Kafka } from 'kafkajs'


import connectToDb from "@/database/connect"
import UserEvent from '@/database/models/Event.model'
const kafka = new Kafka({
  clientId: 'ecommerce-consumer',
  brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'user-event-group' })

export const startKafkaConsumer = async () => {
  await connectToDb()
  await consumer.connect()
  await consumer.subscribe({ topic: 'user-activity', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value!.toString())

      console.log('Consumed event:', event)

      const newEvent = new UserEvent(event)
      await newEvent.save()
    },
  })

  console.log('Kafka consumer running')
}

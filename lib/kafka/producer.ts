// lib/kafka/producer.ts
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'ecommerce-app',
  brokers: ['localhost:9092'],
})
// database-MCFCT2EX
// redis-16577.c8.us-east-1-4.ec2.redns.redis-cloud.com:16577
export const producer = kafka.producer()

export const connectKafkaProducer = async () => {
  await producer.connect()
  console.log('Kafka Producer Connected')
}

export const sendKafkaEvent = async ({
  topic,
  event,
}: {
  topic: string
  event: Record<string, any>
}) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(event) }],
  })
}

var kafka = require('kafka-node')
var service = require('./advert.mongo.service')
var Consumer = kafka.Consumer

const kafkaOptions = { kafkaHost: 'localhost:9092' }
const client = new kafka.KafkaClient(kafkaOptions)
const consumer = new Consumer(
  client,
  [
    { topic: 'new_advert' }
  ],
  {
    autoCommit: true
  }
)

consumer.on('message', function (message) {
  const advert = JSON.parse(message.value)
  console.log(advert)

  service.postAdvert(advert)
})

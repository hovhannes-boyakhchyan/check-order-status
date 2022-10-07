import { Injectable } from '@nestjs/common';
import { Kafka, Partitioners, Producer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { IKafkaOptions, IKafkaMessageSend } from './interfaces';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private readonly configService: ConfigService) {
    const { client } = this.configService.get<IKafkaOptions['options']>(
      'kafkaConfig.options',
    );
    this.kafka = new Kafka(client);
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  async sendMessage(kafkaMessage: IKafkaMessageSend) {
    const { topic, messages } = kafkaMessage;
    await this.producer.connect();

    await this.producer
      .send({
        topic,
        messages,
      })
      .then((data) => console.log('------------Send Data------------', data))
      .catch((e) => console.error(e.message, e));
    await this.producer.disconnect();
  }
}

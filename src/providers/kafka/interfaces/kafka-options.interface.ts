import { Deserializer, Serializer } from '@nestjs/microservices';
import {
  ConsumerConfig,
  KafkaConfig,
  ProducerConfig,
  ConsumerRunConfig,
} from 'kafkajs';

export interface IKafkaOptions {
  name: string;
  options: {
    client: KafkaConfig;
    consumer?: ConsumerConfig;
    consumerRunConfig?: ConsumerRunConfig;
    producer?: ProducerConfig;
    deserializer?: Deserializer;
    serializer?: Serializer;
    consumeFromBeginning?: boolean;
  };
}

import { Message, ProducerRecord } from 'kafkajs';

export interface IKafkaMessageObject extends Message {
  value: any | Buffer | string | null;
  key?: any;
}
export interface IKafkaMessageSend extends Omit<ProducerRecord, 'topic'> {
  messages: IKafkaMessageObject[];
  topic?: string;
}

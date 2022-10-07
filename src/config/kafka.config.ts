import { registerAs } from '@nestjs/config';
import { IKafkaOptions } from '../providers/kafka/interfaces';

export default registerAs('kafkaConfig', (): IKafkaOptions => {
  return {
    name: 'HERO_SERVICE',
    options: {
      client: {
        clientId: 'checkOrdersStatusService',
        brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_ORDER_PORT}`],
      },
    },
  };
});

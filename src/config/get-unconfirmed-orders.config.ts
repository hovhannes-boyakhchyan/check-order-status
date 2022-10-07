import { registerAs } from '@nestjs/config';
import { IGetOrdersConfig } from '../orders/interfaces';
import { OrdersTypesEnum, ProvidersTypesEnum } from '../common/enum';

export default registerAs(
  'getUnconfirmedOrdersConfig',
  (): IGetOrdersConfig => {
    return {
      status: OrdersTypesEnum.unconfirmed,
      amount: 11,
      unit: 'm',
      provider: ProvidersTypesEnum.ubereats,
      isScheduled: false,
    };
  },
);

import { registerAs } from '@nestjs/config';
import { IGetOrdersConfig } from '../orders/interfaces';
import { OrdersTypesEnum } from '../common/enum';

export default registerAs('getUnknownOrdersConfig', (): IGetOrdersConfig => {
  return {
    status: OrdersTypesEnum.unconfirmed,
    amount: 15,
    unit: 'm',
    isScheduled: false,
  };
});

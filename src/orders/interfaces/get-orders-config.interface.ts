import { OrdersTypesEnum, ProvidersTypesEnum } from '../../common/enum';
import moment from 'moment';

export interface IGetOrdersConfig {
  readonly status?: OrdersTypesEnum;
  readonly amount: number;
  readonly unit: moment.unitOfTime.DurationConstructor;
  readonly provider?: ProvidersTypesEnum.ubereats;
  readonly isScheduled?: boolean;
}

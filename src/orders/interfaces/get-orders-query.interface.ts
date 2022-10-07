import { OrdersTypesEnum, ProvidersTypesEnum } from '../../common/enum';

interface createdAt {
  $lte?: string;
  $gte?: string;
}

export interface IGetOrdersQuery {
  readonly 'status.status'?: OrdersTypesEnum;
  readonly createdAt?: createdAt;
  readonly provider?: ProvidersTypesEnum | { $nin: ProvidersTypesEnum[] };
  readonly isScheduled?: boolean;
}

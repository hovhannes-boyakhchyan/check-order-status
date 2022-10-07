import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { Order, OrderDocument } from './schemas';
import { KafkaService } from '../providers/kafka/kafka.service';
import { IGetOrdersConfig, IGetOrdersQuery } from './interfaces';
import { ProvidersTypesEnum, TopicsEnum } from '../common/enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly kafkaService: KafkaService,
    private readonly configService: ConfigService,
  ) {}

  async getOrders(query: IGetOrdersQuery): Promise<Order[]> {
    return this.orderModel.find(query);
  }

  async sendUnknownOrders(): Promise<void> {
    const now = moment().utc().format();
    const { status, amount, unit } = this.configService.get<IGetOrdersConfig>(
      'getUnknownOrdersConfig',
    );
    const query: IGetOrdersQuery = {
      'status.status': status,
      createdAt: {
        $lte: moment(now).subtract(amount, unit).utc().format(),
      },
      isScheduled: false,
      provider: {
        $nin: [ProvidersTypesEnum.ubereats, ProvidersTypesEnum.website],
      },
    };
    const orders: Order[] = await this.getOrders(query);

    if (orders?.length) {
      await this.kafkaService.sendMessage({
        topic: TopicsEnum.orders_with_unknown_status_detect,
        messages: [{ value: JSON.stringify(orders) }],
      });
    }
  }

  async sendUnconfirmedOrders(): Promise<void> {
    const now = moment().utc().format();
    const { status, amount, unit, provider } =
      this.configService.get<IGetOrdersConfig>('getUnconfirmedOrdersConfig');
    const query: IGetOrdersQuery = {
      'status.status': status,
      createdAt: {
        $lte: moment(now).subtract(amount, unit).utc().format(),
      },
      provider,
      isScheduled: false,
    };
    const orders: Order[] = await this.getOrders(query);

    if (orders?.length) {
      await this.kafkaService.sendMessage({
        topic: TopicsEnum.orders_with_unconfirmed_status_detect,
        messages: [{ value: JSON.stringify(orders) }],
      });
    }
  }
}

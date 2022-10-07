import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [],
  providers: [OrdersService],
})
export class OrdersModule {}

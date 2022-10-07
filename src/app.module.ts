import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  databaseConfig,
  kafkaConfig,
  getUnknownOrdersConfig,
  getUnconfirmedOrdersConfig,
  tasks,
} from './config';
import { TasksModule } from './tasks/tasks.module';
import { OrdersModule } from './orders/orders.module';
import { KafkaModule } from './providers/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${
        process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production'
          ? 'production'
          : 'development'
      }.env`,
      load: [
        databaseConfig,
        kafkaConfig,
        getUnknownOrdersConfig,
        getUnconfirmedOrdersConfig,
        tasks,
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    OrdersModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ITaskDescription } from './interfaces';
import { TasksTypesEnum } from '../common/enum';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly ordersService: OrdersService,
    private readonly configService: ConfigService,
  ) {
    const tasks = this.configService.get<ITaskDescription[]>('tasks');
    this.startTasks(tasks);
  }

  private startTasks(tasks: ITaskDescription[]): void {
    tasks.forEach((task: ITaskDescription) => {
      if (task.type === TasksTypesEnum.orders_with_unknown_status_detect) {
        this.createTask(
          task,
          this.ordersService.sendUnknownOrders.bind(this.ordersService),
        );
      } else if (
        task.type === TasksTypesEnum.orders_with_unconfirmed_status_detect
      ) {
        this.createTask(
          task,
          this.ordersService.sendUnconfirmedOrders.bind(this.ordersService),
        );
      }
    });
  }

  createTask(task: ITaskDescription, cb: () => void) {
    const job = new CronJob(task.schedule, () => {
      cb();
    });

    this.schedulerRegistry.addCronJob(task.type, job);

    if (task.start) {
      job.start();
    }
  }
}

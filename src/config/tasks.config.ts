import { registerAs } from '@nestjs/config';
import { CronExpression } from '@nestjs/schedule';
import { TasksTypesEnum } from '../common/enum';
import { ITaskDescription } from '../tasks/interfaces';

export default registerAs('tasks', (): ITaskDescription[] => {
  return [
    {
      start: true,
      type: TasksTypesEnum.orders_with_unknown_status_detect,
      schedule: CronExpression.EVERY_30_SECONDS,
    },
    {
      start: true,
      type: TasksTypesEnum.orders_with_unconfirmed_status_detect,
      schedule: CronExpression.EVERY_30_SECONDS,
    },
  ];
});

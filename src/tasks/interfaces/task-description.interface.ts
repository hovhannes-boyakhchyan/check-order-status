import { CronExpression } from '@nestjs/schedule';
import { TasksTypesEnum } from '../../common/enum';

export interface ITaskDescription {
  type: TasksTypesEnum;
  start: boolean;
  schedule: CronExpression;
}

import { IsEnum } from 'class-validator';
import { TasksTypesEnum } from '../../common/enum';

export class TasksTypesDto {
  @IsEnum(TasksTypesEnum)
  readonly task_type: TasksTypesEnum;
}

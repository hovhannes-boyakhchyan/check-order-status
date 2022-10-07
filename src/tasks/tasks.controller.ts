import { Controller, Param, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TasksTypesDto } from './dto/tasks-types.dto';

@Controller('task')
export class TasksController {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Post('/stop/:task_type')
  stopTask(@Param() taskType: TasksTypesDto): string {
    const job = this.schedulerRegistry.getCronJob(taskType.task_type);
    job.stop();
    return `Task ${taskType.task_type} is stopped`;
  }

  @Post('/start/:task_type')
  startTask(@Param() taskType: TasksTypesDto): string {
    const job = this.schedulerRegistry.getCronJob(taskType.task_type);
    job.start();
    return `Task ${taskType.task_type} is started`;
  }
}

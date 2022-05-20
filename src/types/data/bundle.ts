import { IHintAlarmType, ITaskCheckType, ITaskType } from './atomic';
import { ITag } from './ITag';
import { ITaskDisplay } from './ITask';

export interface ITaskListBundle {
  tasks: ITaskDisplay[];
  tags: ITag[];
}

export interface ITaskAddBundle {
  task_types: ITaskType[];
  task_check_types: ITaskCheckType[];
  hint_alarm_types: IHintAlarmType[];
}

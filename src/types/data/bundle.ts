import {
  IHintAlarmType,
  IRole,
  ITaskCheckType,
  ITaskType,
} from './atomic';
import { IGroup } from './IGroup';
import { ITag } from './ITag';
import { ITaskDisplay, ITaskEdit } from './ITask';
import { IUser } from './IUser';

export interface ITaskListBundle {
  tasks: ITaskDisplay[];
  tags: ITag[];
}

export interface ITaskAddBundle {
  task_types: ITaskType[];
  task_check_types: ITaskCheckType[];
  hint_alarm_types: IHintAlarmType[];
}

export interface ITaskEditBundle {
  task: ITaskEdit;
  task_types: ITaskType[];
  task_check_types: ITaskCheckType[];
  hint_alarm_types: IHintAlarmType[];
}

export interface INotificationAddBundle {
  users: IUser[];
  roles: IRole[];
  groups: IGroup[];
}

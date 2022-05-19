import { ITag } from './ITag';
import { ITaskDisplay } from './ITask';

export interface ITaskListBundle {
  tasks: ITaskDisplay[];
  tags: ITag[];
}

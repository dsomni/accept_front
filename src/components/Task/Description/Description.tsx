import { FC, memo, useEffect, useRef } from 'react';
import { ITaskDisplay } from '@custom-types/ITask';
import styles from './description.module.css';

const Description: FC<{ task: ITaskDisplay }> = ({ task }) => {
  const description = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (description.current)
      description.current.innerHTML = task.description;
  }, [task.description]);
  return (
    <div className={styles.wrapper}>
      <div>{task.title}</div>
      <div ref={description}>{task.description}</div>
    </div>
  );
};

export default memo(Description);

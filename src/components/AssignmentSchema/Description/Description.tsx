import { FC, memo, useEffect, useRef } from 'react';
import { ITaskDisplay } from '@custom-types/ITask';
import styles from './description.module.css';
import { Table } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import CopyButton from '@components/CopyButton/CopyButton';

const Description: FC<{ task: ITaskDisplay }> = ({ task }) => {
  const description = useRef<HTMLDivElement>(null);
  const inputFormat = useRef<HTMLDivElement>(null);
  const outputFormat = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (description.current)
      description.current.innerHTML = task.description;
  }, [task.description]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.description} ref={description}>
        {task.description}
      </div>
    </div>
  );
};

export default Description;

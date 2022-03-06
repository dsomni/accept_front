import { FC, memo, useEffect, useRef } from 'react';
import { ITaskDisplay } from '@custom-types/ITask';
import styles from './description.module.css';
import { Table } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';

const Description: FC<{ task: ITaskDisplay }> = ({ task }) => {
  const description = useRef<HTMLDivElement>(null);
  const inputFormat = useRef<HTMLDivElement>(null);
  const outputFormat = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (description.current)
      description.current.innerHTML = task.description;
    if (inputFormat.current)
      inputFormat.current.innerHTML = task.inputFormat;
    if (outputFormat.current)
      outputFormat.current.innerHTML = task.outputFormat;
  }, [task.description, task.inputFormat, task.outputFormat]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.description} ref={description}>
        {task.description}
      </div>
      <div className={styles.formatWrapper}>
        <div className={styles.inputFormat}>
          <div className={styles.formatLabel}>
            {capitalize(locale.tasks.description.format.input)}
          </div>
          <div className={styles.format} ref={inputFormat}>
            {task.inputFormat}
          </div>
        </div>
        <div className={styles.outputFormat}>
          <div className={styles.formatLabel}>
            {capitalize(locale.tasks.description.format.output)}
          </div>
          <div className={styles.format} ref={outputFormat}>
            {task.outputFormat}
          </div>
        </div>
      </div>
      <Table
        striped
        highlightOnHover
        verticalSpacing="md"
        className={styles.table}
      >
        <thead>
          <tr>
            <td className={styles.tableHeader}>
              {capitalize(locale.tasks.description.examples.input)}
            </td>
            <td className={styles.tableHeader}>
              {capitalize(locale.tasks.description.examples.output)}
            </td>
          </tr>
        </thead>
        <tbody>
          {task.examples.map((example, index) => (
            <tr key={index}>
              <td>{example.inputData}</td>
              <td>{example.outputData}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Description;

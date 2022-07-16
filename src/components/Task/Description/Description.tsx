import { FC, memo, useEffect, useRef } from 'react';
import { ITask } from '@custom-types/data/ITask';
import styles from './description.module.css';
import { Table } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';

import CopyButton from '@ui/CopyButton/CopyButton';
import Head from 'next/head';
import { sendRequest } from '@requests/request';
import { setter } from '@custom-types/ui/atomic';

const Description: FC<{
  task: ITask;
  setShowHint: setter<boolean>;
  preview?: boolean;
}> = ({ task, preview, setShowHint }) => {
  // const description = useRef<HTMLDivElement>(null);
  // const inputFormat = useRef<HTMLDivElement>(null);
  // const outputFormat = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (preview) return;
    sendRequest<{}, boolean>(
      `task/should_show_hint/${task.spec}`,
      'GET',
      undefined,
      5000
    ).then((res) => {
      setShowHint(res.response);
    });
  }, [task.spec, setShowHint, preview]);

  // useEffect(() => {
  //   if (description.current)
  //     description.current.innerHTML = task.description;
  //   if (inputFormat.current)
  //     inputFormat.current.innerHTML = task.inputFormat;
  //   if (outputFormat.current)
  //     outputFormat.current.innerHTML = task.outputFormat;
  // }, [task.description, task.inputFormat, task.outputFormat]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{task.title}</title>
      </Head>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.complexity}>{`${          locale.task.form.complexity} ${task.complexity}%`}</div>
      </div>
      <div className={styles.constraints}>
        <div className={styles.memory}>{`${          locale.task.constraints.memory}: ${task.constraints.memory}Mb`}</div>          locale.task.constraints.memory locale.task.constraints.memory
        )}: ${task.constraints.time}s`}</div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: task.description }}
      />
      <div className={styles.formatWrapper}>
        <div className={styles.inputFormat}>
          <div className={styles.formatLabel}>
            {locale.task.description.format.input}
          </div>
          <div
            className={styles.inputFormat}
            dangerouslySetInnerHTML={{ __html: task.inputFormat }}
          />
        </div>
        <div className={styles.outputFormat}>
          <div className={styles.formatLabel}>
            {locale.task.description.format.output}
          </div>
          <div
            className={styles.outputFormat}
            dangerouslySetInnerHTML={{ __html: task.outputFormat }}
          />
        </div>
      </div>
      <div className={styles.examplesLabel}>
        {locale.task.description.examples.title}
      </div>
      {task.examples.map((example, index) => (
        <Table
          key={index}
          striped
          verticalSpacing="md"
          className={styles.table}
        >
          <tbody>
            <tr>
              <td>
                <div className={styles.exampleHeader}>
                  {locale.task.description.examples.input}
                  <CopyButton toCopy={example.inputData} />
                </div>
              </td>
            </tr>
            <tr key={index}>
              <td>{example.inputData}</td>
            </tr>
            <tr>
              <td>
                <div className={styles.exampleHeader}>
                  {                    locale.task.description.examples.output}
                  <CopyButton toCopy={example.outputData || ''} />
                </div>
              </td>
            </tr>
            <tr>
              <td>{example.outputData}</td>
            </tr>
          </tbody>
        </Table>
      ))}
      {task.remark && (
        <div className={styles.remarkWrapper}>
          <div className={styles.remarkLabel}>
            {locale.task.form.remark}
          </div>
          <div
            className={styles.remark}
            dangerouslySetInnerHTML={{ __html: task.remark }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Description);

import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';
import styles from '@styles/test.module.css';

const columns = [
  'Ученики',
  'Task1',
  'Task2',
  'Task3',
  'Task4',
  'Task5',
  'Task6',
  'Task7',
  'Task8',
  'Task9',
  'Task10',
];

const rows = [
  [
    'person 1',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
  [
    'person 2',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
  [
    'person 3',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
  [
    'person 4',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
  [
    'person 5',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
  [
    'person 6',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
  [
    'person 7',
    'attempt1',
    'attempt2',
    'attempt3',
    'attempt4',
    'attempt5',
    'attempt6',
    'attempt7',
    'attempt8',
    'attempt9',
    'attempt10',
  ],
];

function TestPage() {
  return (
    <div
      style={{
        width: '500px',
        overflow: 'scroll',
        height: '200px',
      }}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, idx) => (
                <td key={idx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;

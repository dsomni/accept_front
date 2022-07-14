import { pureCallback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Button, TextInput } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './form.module.css';
import { sendRequest } from '@requests/request';
import { IStudentList } from '@custom-types/data/IStudent';
import stepperStyles from '@styles/ui/stepper.module.css';

const Form: FC<{
  form: any;
  handleSubmit: pureCallback;
  buttonText: string;
}> = ({ form, handleSubmit, buttonText }) => {
  const [students, setStudents] = useState<IStudentList[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [error, setError] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    let cleanUp = false;
    setLoadingStudents(true);
    sendRequest<{}, IStudentList[]>(
      'students/list',
      'GET',
      undefined,
      60000
    ).then((res) => {
      if (!cleanUp) {
        if (!res.error) {
          setStudents(
            res.response.filter(
              (item) =>
                !form.values['members'].find(
                  (member: Item) => member.login === item.login
                )
            )
          );
        } else {
          setError(true);
        }
        setLoadingStudents(false);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, [form.values['members']]); //eslint-disable-line

  const itemComponent = useCallback((item, handleSelect) => {
    return (
      <div
        className={styles.itemWrapper}
        onClick={() => handleSelect(item)}
      >
        <div className={styles.displayedName}>{item.name}</div>
        <div className={styles.displayedGrade}>
          {item.gradeNumber + ' ' + item.gradeLetter}
        </div>
      </div>
    );
  }, []);

  return (
    <div className={stepperStyles.stepper + ' ' + styles.wrapper}>
      <div className={styles.inputWrapper}>
        <TextInput
          label={capitalize(locale.groups.title)}
          classNames={{
            label: styles.label,
            input: styles.textInput,
          }}
          {...form.getInputProps('title')}
        />
        {!loadingStudents && (
          <CustomTransferList
            defaultOptions={students.map((student) => ({
              ...student,
              label:
                student.name +
                ' ' +
                student.gradeNumber +
                ' ' +
                student.gradeLetter,
              value: student.login,
            }))}
            defaultChosen={form.values['members']}
            setUsed={(value) => {
              form.setFieldValue('members', value);
            }}
            classNames={{ label: styles.label }}
            titles={[
              capitalize(locale.groups.students),
              capitalize(locale.groups.selectedStudents),
            ]}
            itemComponent={itemComponent}
          />
        )}
      </div>
      <div
        className={stepperStyles.buttons + ' ' + styles.buttonWrapper}
      >
        <Button
          color="var(--primary)"
          variant="outline"
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Form;

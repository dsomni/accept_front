import { FC, memo } from 'react';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { AssignmentSchemaSelector } from '@ui/selectors';
import { useLocale } from '@hooks/useLocale';
import { CustomEditor, Helper, TextInput } from '@ui/basics';
import stepperStyles from '@styles/ui/stepper.module.css';
import styles from './origin.module.css';

const Origin: FC<{
  form: any;
  shouldNotify?: boolean;
  assignmentSchemas: IAssignmentSchemaDisplay[];
}> = ({ form, assignmentSchemas, shouldNotify }) => {
  const { locale } = useLocale();

  return (
    <>
      <AssignmentSchemaSelector
        key={2}
        form={form}
        field={'origin'}
        schemas={assignmentSchemas}
      />
      {shouldNotify && (
        <div className={styles.notificationWrapper}>
          <div className={styles.notificationLabel}>
            <div>{locale.notification.notification}</div>
            <Helper
              dropdownContent={
                <div>
                  {locale.helpers.notification.assignmentCreation.map(
                    (p, idx) => (
                      <p key={idx}>{p}</p>
                    )
                  )}
                </div>
              }
            />
          </div>
          <TextInput
            label={locale.notification.form.title}
            required
            {...form.getInputProps('notificationTitle')}
          />
          <TextInput
            label={locale.notification.form.shortDescription}
            helperContent={
              <div>
                {locale.helpers.notification.shortDescription.map(
                  (p, idx) => (
                    <p key={idx}>{p}</p>
                  )
                )}
              </div>
            }
            {...form.getInputProps('notificationShortDescription')}
          />
          <CustomEditor
            classNames={{
              label: stepperStyles.label,
            }}
            helperContent={
              <div>
                {locale.helpers.notification.description.map(
                  (p, idx) => (
                    <p key={idx}>{p}</p>
                  )
                )}
              </div>
            }
            label={locale.notification.form.description}
            form={form}
            name={'notificationDescription'}
          />
        </div>
      )}
    </>
  );
};

export default memo(Origin);

import Description from '@components/AssignmentSchema/Description/Description';
import { FC, memo } from 'react';
import styles from './preview.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';

const Preview: FC<{ form: any }> = ({ form }) => {
  return (
    <>
      <div className={stepperStyles.wrapper}>
        <Description assignment={form.values} preview />
      </div>
    </>
  );
};

export default memo(Preview);

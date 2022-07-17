import { pureCallback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Stepper, Group, Button } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useState } from 'react';

import stepperStyles from '@styles/ui/stepper.module.css';
import SecondaryInfo from '@components/Tournament/Form/SecondaryInfo/SecondaryInfo';
import MainInfo from '@components/Tournament/Form/MainInfo/MainInfo';
import TypeInfo from './TypeInfo/TypeInfo';
import Preview from './Preview/Preview';

const Form: FC<{
  form: any;
  handleSubmit: pureCallback<void>;
  buttonLabel: string;
}> = ({ form, handleSubmit, buttonLabel }) => {
  const { locale } = useLocale();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((current) =>
      current < 4 ? current + 1 : current
    );
  const prevStep = () =>
    setCurrentStep((current) =>
      current > 0 ? current - 1 : current
    );

  return (
    <>
      <Stepper
        className={stepperStyles.stepper}
        iconPosition="right"
        active={currentStep}
        onStepClick={setCurrentStep}
        breakpoint={1000}
      >
        <Stepper.Step
          label={capitalize(locale.tournament.form.steps.first.label)}
          description={capitalize(
            locale.tournament.form.steps.first.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.tournament.form.steps.second.label
          )}
          description={capitalize(
            locale.tournament.form.steps.second.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tournament.form.steps.third.label)}
          description={capitalize(
            locale.tournament.form.steps.third.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.tournament.form.steps.fourth.label
          )}
          description={capitalize(
            locale.tournament.form.steps.fourth.description
          )}
        />
      </Stepper>
      <div>
        {currentStep === 0 && <MainInfo form={form} />}
        {currentStep === 1 && <SecondaryInfo form={form} />}
        {currentStep === 2 && <TypeInfo form={form} />}
        {currentStep === 3 && <Preview form={form} />}
        <Group
          position="center"
          mt="xl"
          className={stepperStyles.buttons}
        >
          {currentStep !== 0 && (
            <Button variant="default" onClick={prevStep}>
              {capitalize(locale.form.back)}
            </Button>
          )}
          <Button
            onClick={
              currentStep !== 3
                ? nextStep
                : form.onSubmit(handleSubmit)
            }
            type={currentStep === 3 ? 'submit' : 'button'}
          >
            {currentStep === 3
              ? buttonLabel
              : capitalize(locale.form.next)}
          </Button>
        </Group>
      </div>
    </>
  );
};

export default memo(Form);

import { useLocale } from '@hooks/useLocale';
import { Group } from '@mantine/core';
import { FC, memo, ReactNode, useCallback, useState } from 'react';
import stepperStyles from '@styles/ui/stepper.module.css';
import { Stepper as MantineStepper } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { Button } from '@ui/basics';

const Stepper: FC<{
  form: any;
  stepFields: string[][];
  pages: ReactNode[];
  handleSubmit: () => void;
  contentClass?: any;
  buttonLabel: string;
  labels: string[];
  descriptions: string[];
  customWrapper?: boolean;
  iconPosition?: 'right' | 'left';
  icons?: ReactNode[];
}> = ({
  form,
  stepFields,
  pages,
  handleSubmit,
  contentClass,
  buttonLabel,
  labels,
  descriptions,
  customWrapper,
  iconPosition,
  icons,
}) => {
  const { locale } = useLocale();
  const LAST_PAGE = pages.length - 1;
  const [currentStep, setCurrentStep] = useState(0);

  const validateStep = useCallback(
    (step: number) => {
      var error = false;
      stepFields[step].forEach((field: string) => {
        const res = form.validateField(field);
        error = error || res.hasError;
      });
      return error;
    },
    [form, stepFields]
  );

  const nextStep = useCallback(() => {
    setCurrentStep((current) => {
      if (!validateStep(current)) {
        return current < LAST_PAGE ? current + 1 : current;
      }
      return current;
    });
  }, [validateStep, LAST_PAGE]);

  const prevStep = useCallback(() => {
    setCurrentStep((current) => {
      return current > 0 ? current - 1 : current;
    });
  }, []);

  const getErrorsStep = useCallback(
    (step: number) => {
      let error = false;
      stepFields[step].forEach((field: string) => {
        if (form.errors[field] !== undefined) {
          error = true;
          return;
        }
      });
      return error;
    },
    [form.errors, stepFields]
  );

  const onStepperChange = useCallback(
    (newStep: number) => {
      if (newStep < currentStep || !validateStep(currentStep)) {
        setCurrentStep(newStep);
      }
    },
    [currentStep, validateStep]
  );

  return (
    <>
      <MantineStepper
        className={customWrapper ? undefined : stepperStyles.stepper}
        classNames={
          contentClass
            ? { content: contentClass }
            : { content: stepperStyles.wrapper }
        }
        iconPosition={iconPosition || 'right'}
        active={currentStep}
        onStepClick={onStepperChange}
        breakpoint={1000}
      >
        {pages.map((page, index) => (
          <MantineStepper.Step
            key={index}
            label={labels[index]}
            description={descriptions[index]}
            icon={
              getErrorsStep(index) ? (
                <AlertCircle color={'var(--negative)'} />
              ) : icons ? (
                icons[index]
              ) : undefined
            }
            completedIcon={
              getErrorsStep(index) ? (
                <AlertCircle color={'white'} />
              ) : undefined
            }
            color={getErrorsStep(index) ? 'red' : undefined}
          >
            {page}
          </MantineStepper.Step>
        ))}
      </MantineStepper>
      <Group
        position="center"
        mt="xl"
        className={stepperStyles.buttons}
      >
        {currentStep !== 0 && (
          <Button variant="outline" onClick={prevStep}>
            {locale.form.back}
          </Button>
        )}
        <Button
          onClick={
            currentStep !== LAST_PAGE ? nextStep : handleSubmit
          }
          disabled={
            currentStep !== LAST_PAGE && getErrorsStep(currentStep)
          }
          type="button"
        >
          {currentStep === LAST_PAGE ? buttonLabel : locale.form.next}
        </Button>
      </Group>
    </>
  );
};

export default memo(Stepper);
import { FC, memo, ReactNode, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import styles from './codeArea.module.css';
import { callback } from '@custom-types/ui/atomic';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { ILanguage } from '@custom-types/data/atomic';
import { extensionValidator } from '@utils/extensionValidator';
import { TextArea, Dropzone } from '@ui/basics';
import { ButtonProps, PopoverProps } from '@mantine/core';

const CodeArea: FC<{
  label: string;
  setLanguage: callback<string, void>;
  languages: ILanguage[];
  setCode: callback<string, void>;
  formProps?: any;
  classNames?: object;
  helperContent?: string | ReactNode;

  buttonProps?: ButtonProps<'button'>;
  buttonPopoverProps?: Omit<
    PopoverProps,
    'opened' | 'children' | 'target'
  >;
  buttonPopoverContent?: string | ReactNode;
}> = ({
  label,
  setLanguage,
  languages,
  setCode,
  formProps,
  classNames,
  helperContent,
  buttonProps,
  buttonPopoverProps,
  buttonPopoverContent,
}) => {
  const { locale } = useLocale();

  const onDrop = useCallback(
    (files: File[]) => {
      const id = newNotification({
        autoClose: 2000,
        title: locale.ui.codeArea.notification.uploading.title,
        message:
          locale.ui.codeArea.notification.uploading.description,
      });
      if (!files[0]) {
        errorNotification({
          id,
          title: locale.ui.codeArea.notification.error.title,
          message: locale.ui.codeArea.notification.error.description,
          autoClose: 5000,
        });
        return;
      }
      const language: string | undefined = extensionValidator(
        files[0].name,
        languages
      );
      if (!language) {
        errorNotification({
          id,
          title: locale.ui.codeArea.notification.reject.title,
          message: locale.ui.codeArea.notification.reject.description,
          autoClose: 5000,
        });
        return;
      }
      setLanguage(language);
      files[0].text().then((res) => setCode(res));
      successNotification({
        id,
        title: locale.ui.codeArea.notification.success.title,
        message: locale.ui.codeArea.notification.success.description,
        autoClose: 2000,
      });
    },
    [languages, locale, setCode, setLanguage]
  );

  return (
    <div className={styles.codeWrapper}>
      <Dropzone
        style={{ height: '100%' }}
        onDrop={onDrop}
        title={locale.ui.codeArea.dragFiles}
        description={''}
        showButton
        buttonProps={buttonProps}
        buttonPopoverContent={buttonPopoverContent}
        buttonPopoverProps={buttonPopoverProps}
      >
        <div className={styles.inner}>
          <TextArea
            helperContent={helperContent}
            classNames={classNames}
            placeholder={locale.placeholders.code}
            onChange={(e) => setCode(e.target.value)}
            minRows={40}
            label={label}
            {...formProps}
          />
        </div>
      </Dropzone>
    </div>
  );
};

export default memo(CodeArea);

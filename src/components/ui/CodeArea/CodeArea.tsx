import { FC, memo, ReactNode, useCallback, useState } from 'react';

import Dropzone from '@ui/Dropzone/Dropzone';
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

import TextArea from '@ui/TextArea/TextArea';

const CodeArea: FC<{
  label: string;
  setLanguage: callback<string, void>;
  languages: ILanguage[];
  setCode: callback<string, void>;
  formProps?: any;
  classNames?: object;
  helperContent?: string | ReactNode;
}> = ({
  label,
  setLanguage,
  languages,
  setCode,
  formProps,
  classNames,
  helperContent,
}) => {
  const { locale } = useLocale();
  const [drag, setDrag] = useState(false);

  const onDrop = useCallback(
    (files: File[]) => {
      console.log(1);
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
        style={{ display: drag ? 'block' : 'none', height: '100%' }}
        onDrop={onDrop}
        setDrag={setDrag}
        title={locale.ui.codeArea.dragFiles}
        description={''}
        showButton
      >
        <div className={styles.inner}>
          {!drag && (
            <TextArea
              helperContent={helperContent}
              classNames={classNames}
              placeholder={locale.placeholders.code}
              onChange={(e) => setCode(e.target.value)}
              minRows={40}
              label={label}
              {...formProps}
            />
          )}
        </div>
      </Dropzone>
    </div>
  );
};

export default memo(CodeArea);

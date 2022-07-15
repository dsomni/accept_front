import { Group, Text } from '@mantine/core';
import { FileUpload } from 'tabler-icons-react';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Textarea } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useLocale } from '@hooks/useLocale';
import styles from './codeArea.module.css';
import { capitalize } from '@utils/capitalize';
import { callback } from '@custom-types/ui/atomic';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { ILanguage } from '@custom-types/data/atomic';
import { extensionValidator } from '@utils/extensionValidator';
import Button from '@components/ui/Button/Button';

const CodeArea: FC<{
  label: string;
  setLanguage: callback<string, void>;
  languages: ILanguage[];
  setCode: callback<string, void>;
  formProps?: any;
  classNames?: object;
}> = ({
  label,
  setLanguage,
  languages,
  setCode,
  formProps,
  classNames,
}) => {
  const { locale } = useLocale();
  const openRef = useRef<() => void>(() => {});

  const [drag, setDrag] = useState(false);

  const draggable = useRef<HTMLDivElement>(null);

  const dragStart = useCallback(() => {
    setDrag(true);
  }, []);
  const dragEnd = useCallback(() => {
    setDrag(false);
  }, []);

  useEffect(() => {
    const current = draggable.current;
    if (current) {
      current.addEventListener('dragenter', dragStart);
      current.addEventListener('dragleave', () => setDrag(false));
    }
    return () => {
      if (current) {
        current.removeEventListener('dragenter', dragStart);
        current.removeEventListener('dragleave', dragEnd);
      }
    };
  }, [draggable, dragStart, dragEnd]);

  const onDrop = useCallback(
    (files: File[]) => {
      const id = newNotification({
        autoClose: 2000,
        title: capitalize(
          locale.codeArea.notification.uploading.title
        ),
        message: capitalize(
          locale.codeArea.notification.uploading.description
        ),
      });
      if (!files[0]) {
        errorNotification({
          id,
          title: capitalize(locale.codeArea.notification.error.title),
          message: capitalize(
            locale.codeArea.notification.error.description
          ),
          autoClose: 5000,
        });
        setDrag(false);
        return;
      }
      const language: string | undefined = extensionValidator(
        files[0].name,
        languages
      );
      if (!language) {
        errorNotification({
          id,
          title: capitalize(
            locale.codeArea.notification.reject.title
          ),
          message: capitalize(
            locale.codeArea.notification.reject.description
          ),
          autoClose: 5000,
        });
        setDrag(false);
        return;
      }
      setLanguage(language);
      files[0].text().then((res) => setCode(res));
      successNotification({
        id,
        title: capitalize(locale.codeArea.notification.success.title),
        message: capitalize(
          locale.codeArea.notification.success.description
        ),
        autoClose: 2000,
      });
      setDrag(false);
    },
    [languages, locale, setCode, setLanguage]
  );

  return (
    <div ref={draggable}>
      <div className={styles.codeWrapper}>
        {!drag && (
          <Textarea
            classNames={classNames}
            placeholder={capitalize(locale.placeholders.code)}
            onChange={(e) => setCode(e.target.value)}
            minRows={40}
            label={label}
            {...formProps}
          />
        )}
        <Dropzone
          openRef={openRef}
          style={{ display: drag ? 'block' : 'none', height: '100%' }}
          onDrop={onDrop}
        >
          {(status) => (
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: 'none' }}
            >
              <FileUpload
                style={{
                  width: 80,
                  height: 80,
                  color: 'white',
                }}
              />

              <div>
                <Text size="xl" inline>
                  {capitalize(locale.codeArea.drag)}
                </Text>
              </div>
            </Group>
          )}
        </Dropzone>
      </div>
      <Button
        variant="outline"
        onClick={() => openRef.current()}
        style={{
          display: drag ? 'none' : 'block',
          marginTop: 'var(--spacer-xl)',
        }}
      >
        {capitalize(locale.codeArea.selectFiles)}
      </Button>
    </div>
  );
};

export default memo(CodeArea);

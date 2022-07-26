import { FC, memo, useCallback, useState } from 'react';
import { Group, Modal } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import styles from './addTag.module.css';
import { useLocale } from '@hooks/useLocale';

import { isSuccessful } from '@requests/request';
import { pureCallback } from '@custom-types/ui/atomic';
import TextInput from '@ui/TextInput/TextInput';
import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';
import { requestWithNotify } from '@utils/requestWithNotify';
import { ITag } from '@custom-types/data/ITag';

const AddTag: FC<{ refetch: pureCallback<void>; addURL: string }> = ({
  refetch,
  addURL,
}) => {
  const [opened, setOpened] = useState(false);
  const { locale, lang } = useLocale();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const validate = useCallback(
    (title: string) => {
      if (title.length >= 3) {
        setError('');
        return true;
      }
      setError(locale.ui.tagSelector.minLength(locale.name, 3));
      return false;
    },
    [locale.name, locale.ui.tagSelector]
  );

  const handleSubmit = useCallback(
    (title: string) => {
      if (validate(title)) {
        requestWithNotify<{ title: string }, ITag>(
          addURL,
          'POST',
          locale.tag.add,
          lang,
          (response: ITag) => response.spec,
          {
            title: title,
          },
          () => {
            refetch();
            setOpened(false);
          },
          { autoClose: 5000 }
        );
      }
    },
    [addURL, lang, locale.tag.add, refetch, validate]
  );

  return (
    <div className={styles.wrapper}>
      <Icon
        onClick={() => setOpened(true)}
        tabIndex={5}
        color="var(--primary)"
        variant="hover"
        size="sm"
      >
        <Plus width={25} height={25} color="green" />
      </Icon>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        size="md"
        title={locale.ui.tagSelector.add}
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <TextInput
            className={styles.input}
            autoFocus
            required
            label={locale.name}
            size="md"
            onChange={(e: any) => {
              validate(title);
              setTitle(e.target.value);
            }}
            error={error}
            placeholder={locale.ui.tagSelector.addPlaceholder}
          />
          <Group
            position="right"
            spacing="lg"
            className={styles.buttons}
          >
            <Button
              variant="outline"
              kind="negative"
              onClick={() => setOpened(false)}
            >
              {locale.cancel}
            </Button>
            <Button
              variant="outline"
              kind="positive"
              disabled={!!error}
              onClick={() => handleSubmit(title)}
            >
              {locale.save}
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default memo(AddTag);

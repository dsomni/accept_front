import { useLocale } from '@hooks/useLocale';
import { Group } from '@mantine/core';

import { FC, memo, useCallback, useState } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { Button, Icon } from '@ui/basics';
import { IGroupDisplay } from '@custom-types/data/IGroup';
import { Trash } from 'tabler-icons-react';

const DeleteModal: FC<{
  group: IGroupDisplay;
}> = ({ group }) => {
  const { locale, lang } = useLocale();

  const [active, setActive] = useState(false);

  const handleDelete = useCallback(() => {
    requestWithNotify(
      `group/delete/${group.spec}`,
      'DELETE',
      locale.notify.group.delete,
      lang,
      (_: any) => '',
      undefined,
      () => setActive(false)
    );
  }, [group.spec, locale, lang]);

  return (
    <>
      <Icon color="red" size="xs" onClick={() => setActive(true)}>
        <Trash />
      </Icon>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={locale.group.modals.delete + ` '${group.name}' ?`}
      >
        <div className={deleteModalStyles.form}>
          <div className={deleteModalStyles.question}>
            {locale.group.modals.deleteConfidence}
          </div>
          <Group
            position="right"
            spacing="lg"
            className={deleteModalStyles.buttons}
          >
            <Button
              variant="outline"
              kind="positive"
              autoFocus
              onClick={() => setActive(false)}
            >
              {locale.cancel}
            </Button>
            <Button
              variant="outline"
              kind="negative"
              onClick={() => handleDelete()}
            >
              {locale.delete}
            </Button>
          </Group>
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(DeleteModal);

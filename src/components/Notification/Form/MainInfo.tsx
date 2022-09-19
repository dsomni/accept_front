import { useLocale } from '@hooks/useLocale';
import { Switch, TextInput } from '@ui/basics';
import { FC, memo, useState } from 'react';
import { useUser } from '@hooks/useUser';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const [asSystem, setAsSystem] = useState(false);
  const { isAdmin } = useUser();

  return (
    <>
      <TextInput
        label={locale.notification.form.title}
        required
        {...form.getInputProps('title')}
      />
      <TextInput
        label={locale.notification.form.author}
        helperContent={
          <div>
            {locale.helpers.notification.author.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        }
        disabled={asSystem}
        {...form.getInputProps('author')}
      />
      {isAdmin && (
        <Switch
          label={locale.notification.form.asSystem}
          styles={{}}
          checked={asSystem}
          onChange={(event) => {
            form.setFieldValue('author', 'System'),
              setAsSystem(event.currentTarget.checked);
          }}
        />
      )}
    </>
  );
};

export default memo(MainInfo);

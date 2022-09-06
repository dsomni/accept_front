import { FC, memo, useState } from 'react';
import Description from '@components/Task/Description/Description';
import { Eye } from 'tabler-icons-react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { useLocale } from '@hooks/useLocale';

const Preview: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  const [openedHint, setOpenedHint] = useState(false);
  const { width } = useWidth();
  return (
    <>
      {form.values.hasHint && (
        <SimpleModal
          title={locale.task.form.hint.title}
          opened={openedHint}
          close={() => setOpenedHint(false)}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: form.values.hintContent,
            }}
          />
        </SimpleModal>
      )}
      <Description
        task={{
          ...form.values,
          constraints: {
            time: form.values.constraintsTime,
            memory: form.values.constraintsMemory,
          },
        }}
        setShowHint={() => {}}
        preview
      />
      {form.values.hasHint && (
        <SingularSticky
          icon={
            <Eye
              width={STICKY_SIZES[width] / 3}
              height={STICKY_SIZES[width] / 3}
            />
          }
          onClick={() => setOpenedHint(true)}
        />
      )}
    </>
  );
};

export default memo(Preview);

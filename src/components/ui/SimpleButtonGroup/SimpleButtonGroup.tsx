import { callback } from '@custom-types/ui/atomic';
import { MyButtonProps } from '@custom-types/ui/basics/button';
import { useLocale } from '@hooks/useLocale';
import { Group } from '@mantine/core';
import { Button } from '@ui/basics';
import { FC, memo } from 'react';

interface ButtonInfo {
  label?: string;
  onClick: callback;
  props?: MyButtonProps;
}

const SimpleButtonGroup: FC<{
  actionButton: ButtonInfo;
  cancelButton: ButtonInfo;
}> = ({ actionButton, cancelButton }) => {
  const { locale } = useLocale();

  return (
    <Group position="right" spacing="lg">
      <Button
        variant="outline"
        kind="negative"
        onClick={cancelButton.onClick}
        {...cancelButton.props}
      >
        {cancelButton.label || locale.no}
      </Button>
      <Button
        variant="outline"
        kind="positive"
        onClick={actionButton.onClick}
        {...actionButton.props}
      >
        {actionButton.label || locale.yes}
      </Button>
    </Group>
  );
};

export default memo(SimpleButtonGroup);

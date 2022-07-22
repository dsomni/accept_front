import {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  useMemo,
} from 'react';
import styles from './dropzone.module.css';
import { Button, ButtonProps, Group, Text } from '@mantine/core';
import { Dropzone as MantineDropzone } from '@mantine/dropzone';
import { CircleX, FileUpload, Photo } from 'tabler-icons-react';
import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';

const Dropzone: FC<{
  children: ReactNode;
  onDrop: (_: any) => void;
  title: string;
  description: string;
  setDrag: setter<boolean>;
  accept?: string[];
  style?: any;
  showButton?: boolean;
  buttonProps?: ButtonProps<'button'>
}> = ({
  children,
  onDrop,
  accept,
  title,
  description,
  setDrag,
  style,
  showButton,
  buttonProps
}) => {
  const { locale } = useLocale();

  const openRef = useRef(() => {});
  const draggable = useRef<HTMLDivElement>(null);
  const [drag, setDragInner] = useState(0);
  const dragStart = useCallback(() => {
    setDragInner((drag) => drag + 1);
    setDrag(true);
  }, [setDrag]);
  const dragEnd = useCallback(() => {
    setDragInner((drag) => drag - 1);
    setDrag(false);
  }, [setDrag]);

  useEffect(() => {
    const current = draggable.current;
    if (current) {
      current.addEventListener('dragenter', dragStart);
      current.addEventListener('dragleave', dragEnd);
    }
    return () => {
      if (current) {
        current.removeEventListener('dragenter', dragStart);
        current.removeEventListener('dragleave', dragEnd);
      }
    };
  }, [draggable, dragStart, dragEnd]);

  return (
    <div ref={draggable} style={{ position: 'relative' }}>
      {drag > 0 && (
        <MantineDropzone
          openRef={openRef}
          disabled={false}
          accept={accept}
          onDrop={(files) => {
            dragEnd();
            onDrop(files);
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
          }}
          onReject={(files) => dragEnd()}
        >
          {(status) => (
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: 'none' }}
            >
              <ImageUploadIcon
                status={status}
                style={{
                  width: 80,
                  height: 80,
                  color: 'white',
                }}
              />
              <div>
                <Text size="xl" inline>
                  {title}
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  {description}
                </Text>
              </div>
            </Group>
          )}
        </MantineDropzone>
      )}
      {showButton && (
        <Button
          variant="outline"
          onClick={() => openRef.current()}
          style={{
            display: drag ? 'none' : 'block',
            marginTop: 'var(--spacer-l)',
          }}
          {...buttonProps}
        >
          {locale.ui.codeArea.selectFiles}
        </Button>
      )}
      {children}
    </div>
  );
};

export default memo(Dropzone);

function ImageUploadIcon({ ...props }) {
  const status = props.status;
  if (status.accepted) {
    return <FileUpload {...props} />;
  }

  if (status.rejected) {
    return <CircleX {...props} />;
  }

  return <Photo {...props} />;
}

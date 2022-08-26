import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Group, Text } from '@mantine/core';
import { Dropzone as MantineDropzone } from '@mantine/dropzone';
import { CircleX, FileUpload, Photo } from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@ui/basics';
import { MyButtonProps } from '@custom-types/ui/basics/button';

const Dropzone: FC<{
  children: ReactNode;
  onDrop: (_: any) => void;
  title: string;
  description: string;

  accept?: string[];

  showButton?: boolean;
  buttonProps?: MyButtonProps;
}> = ({
  children,
  onDrop,
  accept,
  title,
  description,

  showButton,
  buttonProps,
}) => {
  const { locale } = useLocale();

  const openRef = useRef(() => {});
  const draggable = useRef<HTMLDivElement>(null);
  const [drag, setDragInner] = useState(0);
  const dragStart = useCallback(() => {
    setDragInner((drag) => drag + 1);
  }, []);
  const dragEnd = useCallback(() => {
    setDragInner((drag) => drag - 1);
  }, []);

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
          // display: drag > 1 ? 'block' : 'none',
          visibility: drag > 0 ? 'visible' : 'hidden',
        }}
        onReject={(_) => dragEnd()}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <MantineDropzone.Accept>
            <FileUpload
              style={{
                width: 80,
                height: 80,
                color: 'white',
              }}
            />
          </MantineDropzone.Accept>
          <MantineDropzone.Reject>
            <CircleX
              style={{
                width: 80,
                height: 80,
                color: 'white',
              }}
            />
          </MantineDropzone.Reject>
          <MantineDropzone.Idle>
            <Photo
              style={{
                width: 80,
                height: 80,
                color: 'white',
              }}
            />
          </MantineDropzone.Idle>

          <div>
            <Text size="xl" inline>
              {title}
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              {description}
            </Text>
          </div>
        </Group>
      </MantineDropzone>

      {showButton && (
        <Button
          variant="outline"
          onClick={() => openRef.current()}
          // style={{
          //   display: drag > 0 ? 'none' : 'block',
          //   marginTop: 'var(--spacer-l)',
          // }}
          targetWrapperStyle={{
            display: drag > 0 ? 'none' : 'block',
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

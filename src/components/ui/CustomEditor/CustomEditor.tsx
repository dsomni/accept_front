import { useLocale } from '@hooks/useLocale';
import { InputWrapper } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { setter } from '@custom-types/ui/atomic';

const editorConfiguration = {
  simpleUpload: {
    uploadUrl: 'http://localhost:8000/api/image/upload',

    withCredentials: true,
  },
};

const CustomEditor: FC<{
  onChange: setter<any>;
  name: string;
  value: string;
  label: string;
  classNames?: object;
}> = ({ onChange, name, value, label, classNames }) => {
  const { locale } = useLocale();

  const editorRef = useRef<any>();
  const { CKEditor, Editor } = editorRef.current || {
    CKEditor: {},
    Editor: {},
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      Editor: require('ckeditor5-custom/build/ckeditor'),
    };
  }, []);

  return (
    <div>
      {isLoaded ? (
        <InputWrapper classNames={classNames} label={label} size="lg">
          <CKEditor
            name={name}
            editor={Editor}
            data={value}
            config={editorConfiguration}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        </InputWrapper>
      ) : (
        <div>{capitalize(locale.loading) + '...'}</div>
      )}
    </div>
  );
};

export default memo(CustomEditor);

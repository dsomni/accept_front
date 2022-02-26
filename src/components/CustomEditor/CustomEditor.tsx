import { InputWrapper } from '@mantine/core';
import { FC, memo, useEffect, useRef, useState } from 'react';

const editorConfiguration = {
  simpleUpload: {
    uploadUrl: 'http://localhost:8000/api/image/upload',

    withCredentials: true,
  },
};

const CustomEditor: FC<{
  onChange: (_: any) => void;
  name: string;
  value: string;
  label: string;
}> = ({ onChange, name, value, label }) => {
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
        <InputWrapper label={label}>
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
        <div>Loading...</div>
      )}
    </div>
  );
};

export default memo(CustomEditor);

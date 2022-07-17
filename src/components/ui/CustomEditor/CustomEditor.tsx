import { useLocale } from '@hooks/useLocale';
import { InputWrapper } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useEffect, useRef, useState } from 'react';

const editorConfiguration = {
  simpleUpload: {
    uploadUrl: 'http://localhost:8000/api/image/upload',

    withCredentials: true,
  },
};

const CustomEditor: FC<{
  name: string;
  label: string;
  form?: any;
  classNames?: object;
}> = ({ name, label, form, classNames }) => {
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
        <InputWrapper
          classNames={classNames}
          label={label}
          size="lg"
          {...form.getInputProps(name)}
        >
          <CKEditor
            name={name}
            editor={Editor}
            data={form.values[name]}
            config={editorConfiguration}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              form.setFieldValue(name, data);
            }}
            onBlur={() => form.validateField(name)}
          />
        </InputWrapper>
      ) : (
        <div>{capitalize(locale.loading) + '...'}</div>
      )}
    </div>
  );
};

export default memo(CustomEditor);

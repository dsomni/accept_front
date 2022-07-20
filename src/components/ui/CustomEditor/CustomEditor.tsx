import { useLocale } from '@hooks/useLocale';

import {
  FC,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import InputWrapper from '@ui/InputWrapper/InputWrapper';

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
  helperContent?: string | ReactNode;
}> = ({ name, label, form, classNames, helperContent }) => {
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
      <InputWrapper
        classNames={classNames}
        label={label}
        size="lg"
        helperContent={helperContent}
        {...form.getInputProps(name)}
      >
        {isLoaded ? (
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
        ) : (
          <div style={{ fontSize: 'var(--font-size-m)' }}>
            {locale.loading + '...'}
          </div>
        )}
      </InputWrapper>
    </div>
  );
};

export default memo(CustomEditor);

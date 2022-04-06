import React, { FC, useEffect, useRef, useState } from 'react';
import Loading from '@components/shared/loading';

const Editor: FC<{
  id: string;
  value: string;
  onChange: Function;
}> = ({ id, value, onChange }) => {
  const editorRef = useRef<{ CKEditor: any; ClassicEditor: any }>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div className={`relative`}>
      {editorLoaded ? (
        <CKEditor
          id={id}
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Editor;

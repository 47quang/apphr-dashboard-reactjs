import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ placeholder, onChange, value }) {
  return (
    <ReactQuill
      theme="snow"
      style={{ width: '100%' }}
      onChange={onChange}
      value={value}
      modules={Editor.modules}
      formats={Editor.formats}
      placeholder={placeholder}
    />
  );
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

export default Editor;

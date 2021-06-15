import { Attachment, HighlightOff } from '@material-ui/icons';
import { FieldArray } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from 'src/stores/apis';

const CommonUploadFileButton = ({ value, name, containerClassName, buttonClassName, isHide }) => {
  const { t } = useTranslation();
  const uploadFileRef = useRef();

  async function upload(files) {
    const responses = await Promise.all(
      Object.values(files).map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.upload.postForm(formData);
      }),
    );
    return responses.map((r) => r['Location']);
  }

  return (
    <FieldArray
      name={name}
      render={({ push, remove }) => (
        <div className={containerClassName}>
          <button
            hidden={isHide}
            className={buttonClassName}
            onClick={(e) => {
              e.preventDefault();
              uploadFileRef.current.click();
            }}
          >
            <Attachment /> {t('label.upload_file')}
          </button>

          <input
            ref={uploadFileRef}
            type="file"
            style={{ display: 'none' }}
            multiple
            onChange={async (e) => {
              push(...(await upload(e.target.files)));
            }}
          />
          <div className="mt-2 row">
            {value &&
              value.length > 0 &&
              value.map((f, idx) => {
                return (
                  <div key={idx} className="border border-primary rounded-pill px-2 py-1 mx-3 my-1 d-flex" role="button">
                    <a href={f}>{`${f.split('/').pop()}`}</a>
                    <div role="button" className="pl-2">
                      <HighlightOff onClick={() => remove(idx)} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    />
  );
};
export default CommonUploadFileButton;

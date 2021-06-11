import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Attachment, Cancel, HighlightOff } from '@material-ui/icons';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { api } from 'src/stores/apis';
import { renderButtons } from 'src/utils/formUtils';

const ImportProfiles = ({ isOpen, handleConfirm, handleCancel, t }) => {
  const range = {
    import: '',
  };
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
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={range}
            //validationSchema={ImportProfilesSchema}
            enableReinitialize
            onSubmit={(values) => {
              // console.log(moment(values.month).endOf('month').format('YYYY-MM-DD'));
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5>{t('title.export_profile')}</h5>
                    <Cancel fontSize="large" onClick={handleCancel} role="button" style={{ color: '#969696' }} />
                  </div>
                  <hr className="mb-3" />
                  <div className="row p-3">
                    <div className={''}>
                      <button
                        hidden={false}
                        className={'btn btn-primary'}
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
                        onChange={async (e) => {
                          let location = await upload(e.target.files);
                          console.log(location);
                          props.setFieldValue('import', location[0]);
                        }}
                      />
                      {props.values.import !== '' ? (
                        <div className="mt-2 row">
                          <div className="border border-primary rounded-pill px-2 py-1 mx-3 my-1 d-flex" role="button">
                            <div>{`${props.values.import.split('/').pop()}`}</div>
                            <div role="button" className="pl-2">
                              <HighlightOff />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary px-4 ml-2`,
                      onClick: (e) => {
                        props.handleSubmit();
                      },
                      name: t('label.import'),
                    },
                  ])}
                  <br />
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportProfiles;

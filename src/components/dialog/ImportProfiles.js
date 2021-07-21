import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Attachment, Cancel, HighlightOff } from '@material-ui/icons';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { ImportProfileSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const ImportProfiles = ({ isOpen, handleConfirm, handleCancel, t }) => {
  const initialValues = {
    import: {},
  };
  const uploadFileRef = useRef();
  function upload(files, setFieldValue) {
    setFieldValue('import', files[0]);
  }
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={ImportProfileSchema}
            enableReinitialize
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append('import', values.import);
              handleConfirm(formData);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5>{t('title.import_profile')}</h5>
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
                        onChange={(e) => {
                          upload(e.target.files, props.setFieldValue);
                        }}
                      />
                      {props.errors && (
                        <div>
                          <small className={'text-danger'}> {t(props.errors.import)}</small>
                        </div>
                      )}
                      {props.values.import?.name ? (
                        <div className="mt-2 row">
                          <div className="border border-primary rounded-pill px-2 py-1 mx-3 my-1 d-flex" role="button">
                            <div>{`${props.values.import?.name}`}</div>
                            <div
                              role="button"
                              className="pl-2"
                              onClick={() => {
                                props.setFieldValue('import', {});
                              }}
                            >
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
                        window.location.href = 'https://apphr.s3.ap-southeast-1.amazonaws.com/file-sample-data-apphr-1626344472917.xlsx';
                      },
                      name: t('label.download_sample'),
                    },
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

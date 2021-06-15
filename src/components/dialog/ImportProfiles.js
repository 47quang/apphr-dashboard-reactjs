import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Attachment, Cancel, HighlightOff } from '@material-ui/icons';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { importProfiles } from 'src/stores/actions/profile';
import { renderButtons } from 'src/utils/formUtils';

const ImportProfiles = ({ isOpen, handleConfirm, handleCancel, t }) => {
  const dispatch = useDispatch();
  const range = {
    import: '',
  };
  const uploadFileRef = useRef();
  function upload(files) {
    const formData = new FormData();
    formData.append('import', files[0]);
    dispatch(importProfiles(formData));
  }
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={range}
            enableReinitialize
            onSubmit={(values) => {
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
                        onChange={(e) => {
                          upload(e.target.files);
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

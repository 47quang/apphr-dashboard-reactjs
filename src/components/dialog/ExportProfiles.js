import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import React from 'react';
import { ExportProfilesSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import CommonTextInput from '../input/CommonTextInput';

const ExportProfiles = ({ isOpen, handleConfirm, handleCancel, t }) => {
  const range = {
    filename: '',
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={range}
            validationSchema={ExportProfilesSchema}
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
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.filename}
                      onBlur={props.handleBlur('filename')}
                      onChange={props.handleChange('filename')}
                      inputID={'filename'}
                      labelText={t('label.file_name')}
                      inputType={'filename'}
                      inputClassName={'form-control'}
                      isRequiredField
                      placeholder={t('placeholder.enter_file_name')}
                      isTouched={props.touched.filename}
                      isError={props.errors.filename && props.touched.filename}
                      errorMessage={t(props.errors.filename)}
                    />
                  </div>
                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary px-4 ml-2`,
                      onClick: (e) => {
                        props.handleSubmit();
                      },
                      name: t('label.export'),
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

export default ExportProfiles;

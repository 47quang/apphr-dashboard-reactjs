import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import React from 'react';
import { ExportWageSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import CommonTextInput from '../input/CommonTextInput';

const ExportWage = ({ isOpen, handleConfirm, handleCancel, t }) => {
  const range = {
    from: '',
    to: '',
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={range}
            validationSchema={ExportWageSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5>{t('label.time_range')}</h5>
                    <Cancel fontSize="large" onClick={handleCancel} role="button" style={{ color: '#969696' }} />
                  </div>
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={props.values.from}
                      onBlur={props.handleBlur('from')}
                      onChange={props.handleChange('from')}
                      inputID={'from'}
                      labelText={t('label.start_date')}
                      inputType={'date'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={props.touched.from}
                      isError={props.errors.from && props.touched.from}
                      errorMessage={t(props.errors.from)}
                      minTime={props.values.from}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={props.values.to}
                      onBlur={props.handleBlur('to')}
                      onChange={props.handleChange('to')}
                      inputID={'to'}
                      labelText={t('label.end_date')}
                      inputType={'date'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={props.touched.to}
                      isError={props.errors.to && props.touched.to}
                      errorMessage={t(props.errors.to)}
                      minTime={props.values.to}
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

export default ExportWage;

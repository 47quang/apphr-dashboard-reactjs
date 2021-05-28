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
    month: '',
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
              // console.log(moment(values.month).endOf('month').format('YYYY-MM-DD'));
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5>{t('label.month_salary')}</h5>
                    <Cancel fontSize="large" onClick={handleCancel} role="button" style={{ color: '#969696' }} />
                  </div>
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.month}
                      onBlur={props.handleBlur('month')}
                      onChange={props.handleChange('month')}
                      inputID={'month'}
                      labelText={t('label.month')}
                      inputType={'month'}
                      inputClassName={'form-control'}
                      isRequiredField
                      placeholder={t('placeholder.select_month')}
                      isTouched={props.touched.month}
                      isError={props.errors.month && props.touched.month}
                      errorMessage={t(props.errors.month)}
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

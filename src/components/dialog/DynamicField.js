import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik } from 'formik';
import React from 'react';
import { NewFieldContract } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const DynamicField = ({ isOpen, handleConfirm, handleCancel, t }) => {
  const newField = {
    name: '',
    type: '',
    value: '',
  };
  const typeOptions = [
    {
      id: 'date',
      name: t('label.date'),
    },
    {
      id: 'text',
      name: 'Text',
    },
    {
      id: 'textArea',
      name: 'Text Area',
    },
  ];
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={newField}
            validationSchema={NewFieldContract}
            enableReinitialize
            onSubmit={(values) => {
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <h5>{t('label.new_field')}</h5>
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={props.values.name ?? ''}
                      onBlur={props.handleBlur(`name`)}
                      onChange={props.handleChange(`name`)}
                      inputID={`name`}
                      labelText={t('label.field_name')}
                      inputType={'text'}
                      isRequiredField
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_field_name')}
                      isTouched={props.touched.name}
                      isError={props.errors.name && props.touched.name}
                      errorMessage={t(props.errors.name)}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={props.values.type ?? ''}
                      onBlur={props.handleBlur(`type`)}
                      onChange={props.handleChange(`type`)}
                      inputID={`type`}
                      labelText={t('label.field_type')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_field_type')}
                      isRequiredField
                      isTouched={props.touched.type}
                      isError={props.errors.type && props.touched.type}
                      errorMessage={t(props.errors.type)}
                      lstSelectOptions={typeOptions}
                    />
                  </div>
                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary  mx-2`,
                      onClick: (e) => {
                        handleCancel();
                      },
                      name: t('label.cancel'),
                      position: 'right',
                    },
                    {
                      type: 'button',
                      className: `btn btn-primary px-4 ml-2`,
                      onClick: (e) => {
                        props.handleSubmit();
                      },
                      name: t('label.create_new'),
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

export default DynamicField;

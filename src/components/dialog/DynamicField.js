import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik } from 'formik';
import React from 'react';
import { NewFieldContract } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const DynamicField = ({ isOpen, handleConfirm, handleCancel, t }) => {
  // const handleChange = (event) => {
  //   setType(event.target.value);
  // };
  const newField = {
    name: '',
    type: '',
    label: '',
    value: '',
  };
  const typeOptions = [
    {
      id: 'date',
      name: 'Ngày',
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
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Formik
            initialValues={newField}
            validationSchema={NewFieldContract}
            enableReinitialize
            onSubmit={(values) => {
              // setNewField(values);
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <h5>{t('label.create_new')}.</h5>
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-4'}
                      value={props.values.name ?? ''}
                      onBlur={props.handleBlur(`name`)}
                      onChange={props.handleChange(`name`)}
                      inputID={`name`}
                      labelText={t('label.field_name')}
                      inputType={'text'}
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_field_name')}
                      isTouched={props.touched.name}
                      isError={props.errors.name && props.touched.name}
                      errorMessage={t(props.errors.name)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-4'}
                      value={props.values.label ?? ''}
                      onBlur={props.handleBlur(`label`)}
                      onChange={props.handleChange(`label`)}
                      inputID={`label`}
                      labelText={t('label.field_label')}
                      inputType={'text'}
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_field_label')}
                      isTouched={props.touched.label}
                      isError={props.errors.label && props.touched.label}
                      errorMessage={t(props.errors.label)}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-4'}
                      value={props.values.type ?? ''}
                      onBlur={props.handleBlur(`type`)}
                      onChange={props.handleChange(`type`)}
                      inputID={`type`}
                      labelText={t('label.field_type')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_field_type')}
                      isRequiredField
                      isTouched={props.touched.label}
                      isError={props.errors.label && props.touched.label}
                      errorMessage={t(props.errors.label)}
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

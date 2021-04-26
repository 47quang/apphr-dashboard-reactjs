import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { renderButtons } from 'src/utils/formUtils';

const ContractAttributeItemBody = ({ t, attributeRef, attribute, validationSchema, submitForm, buttons }) => {
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
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-6">
          <Formik
            innerRef={attributeRef}
            enableReinitialize
            initialValues={attribute}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-12'}
                    value={values.name ?? ''}
                    onBlur={handleBlur(`name`)}
                    onChange={handleChange(`name`)}
                    inputID={`name`}
                    labelText={t('label.field_name')}
                    inputType={'text'}
                    isRequiredField
                    inputClassName={'form-control'}
                    placeholder={t('placeholder.enter_field_name')}
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={t(errors.name)}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-xl-12'}
                    value={values.type ?? ''}
                    onBlur={handleBlur(`type`)}
                    onChange={handleChange(`type`)}
                    inputID={`type`}
                    labelText={t('label.field_type')}
                    selectClassName={'form-control'}
                    placeholder={t('placeholder.select_field_type')}
                    isRequiredField
                    isTouched={touched.type}
                    isError={errors.type && touched.type}
                    errorMessage={t(errors.type)}
                    lstSelectOptions={typeOptions}
                  />
                </div>

                {renderButtons(buttons)}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default ContractAttributeItemBody;

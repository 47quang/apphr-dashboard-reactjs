import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { renderButtons } from 'src/utils/formUtils';

const AllowanceItemBody = ({ t, allowanceRef, allowance, validationSchema, submitForm, buttons }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-10">
          <Formik
            innerRef={allowanceRef}
            enableReinitialize
            initialValues={allowance}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.code}
                    onBlur={handleBlur('code')}
                    onChange={handleChange('code')}
                    inputID={'code'}
                    labelText={t('label.allowance_code')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_allowance_code')}
                    inputClassName={'form-control'}
                    isDisable={true}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={t('label.allowance_name')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_allowance_name')}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={t(errors.name)}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.amount}
                    onBlur={handleBlur('amount')}
                    onChange={handleChange('amount')}
                    inputID={'amount'}
                    labelText={t('label.allowance_amount')}
                    inputType={'number'}
                    placeholder={t('placeholder.enter_allowance_amount')}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.amount}
                    isError={errors.amount && touched.amount}
                    errorMessage={t(errors.amount)}
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

export default AllowanceItemBody;

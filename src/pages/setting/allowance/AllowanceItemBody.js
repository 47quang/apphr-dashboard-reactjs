import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { renderButtons } from 'src/utils/formUtils';

const AllowanceItemBody = ({ t, allowanceRef, allowance, validationSchema, submitForm, buttons, loading }) => {
  const type = [
    { id: 'tax', name: 'Tính thuế' },
    { id: 'no_tax', name: 'Không tính thuế' },
    { id: 'partial_tax', name: 'Có hạn mức' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-6">
            <Formik
              innerRef={allowanceRef}
              enableReinitialize
              initialValues={allowance}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
                <form autoComplete="off">
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.code ?? ''}
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
                      containerClassName={'form-group col-xl-12'}
                      value={values.name ?? ''}
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
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.type ?? ''}
                      labelText={t('label.allowance_type')}
                      selectClassName={'form-control'}
                      isRequiredField
                      onBlur={handleBlur('type')}
                      onChange={(e) => {
                        if (e.target.value !== 'partial_tax') setFieldValue('bound', 0);
                        handleChange('type')(e);
                      }}
                      inputID={'type'}
                      lstSelectOptions={type}
                      placeholder={t('placeholder.select_allowance_type')}
                      isTouched={touched.type}
                      isError={errors.type && touched.type}
                      errorMessage={t(errors.type)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.bound ?? 0}
                      onBlur={handleBlur('bound')}
                      onChange={handleChange('bound')}
                      inputID={'bound'}
                      labelText={t('label.allowance_bound')}
                      inputType={'number'}
                      placeholder={t('placeholder.enter_allowance_bound')}
                      inputClassName={'form-control'}
                      isRequiredField={values.type === 'partial_tax'}
                      isDisable={values.type !== 'partial_tax'}
                      isTouched={touched.bound}
                      isError={errors.bound && touched.bound}
                      errorMessage={t(errors.bound)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.amount ?? ''}
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
        )}
      </div>
    </CContainer>
  );
};

export default AllowanceItemBody;

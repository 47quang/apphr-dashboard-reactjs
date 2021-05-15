import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { renderButtons } from 'src/utils/formUtils';
import Label from 'src/components/text/Label';
import { CircularProgress } from '@material-ui/core';

const OtherFeeItemBody = ({ t, paymentRef, payment, validationSchema, submitForm, buttons, loading }) => {
  const type = [
    { id: 'percent', name: 'Phần trăm' },
    { id: 'value', name: 'Mức phí ' },
  ];
  const by = [
    { id: 'gross', name: 'Tổng thu nhập' },
    { id: 'insurrance', name: 'Lương bảo hiểm ' },
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
              innerRef={paymentRef}
              enableReinitialize
              initialValues={payment}
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
                      value={values.name ?? ''}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.payment_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_payment_name')}
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
                      onBlur={handleBlur('type')}
                      onChange={(e) => {
                        handleChange('type')(e);
                        setFieldValue('by', '');
                        setFieldValue('value', '');
                      }}
                      inputID={'type'}
                      labelText={t('label.payment_type')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_payment_type')}
                      lstSelectOptions={type}
                      isRequiredField
                      isTouched={touched.type}
                      isError={errors.type && touched.type}
                      errorMessage={t(errors.type)}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.by ?? ''}
                      onBlur={handleBlur('by')}
                      onChange={(e) => {
                        handleChange('by')(e);
                      }}
                      inputID={'by'}
                      labelText={t('label.payment_by')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_payment_by')}
                      lstSelectOptions={by}
                      isHidden={values.type !== 'percent'}
                      isRequiredField
                      isTouched={touched.by}
                      isError={errors.by && touched.by}
                      errorMessage={t(errors.by)}
                    />

                    <div className="form-group col-xl-12">
                      <Label text={t('label.payment_value')} required />
                      <div className="input-group">
                        <input
                          type="number"
                          className={'form-control col-11'}
                          rows={5}
                          onBlur={handleBlur('value')}
                          name={`value`}
                          onChange={(e) => handleChange(`value`)(e)}
                          value={values.value}
                          placeholder={t('placeholder.enter_payment_value')}
                        />
                        <span className="input-group-text col-1 d-flex justify-content-center" id="basic-addon2">
                          {values.type === 'percent' ? t('label.percentage') : t('label.vnd')}
                        </span>
                      </div>
                      {errors.value && touched.value && t(errors.value) && (
                        <div>
                          <small className={'text-danger'}>{t(errors.value)}</small>
                        </div>
                      )}
                    </div>
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

export default OtherFeeItemBody;

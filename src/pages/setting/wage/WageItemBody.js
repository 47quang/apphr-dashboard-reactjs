import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const WageItemBody = ({ t, wageRef, wage, validationSchema, submitForm, buttons, loading, isCreate }) => {
  const paymentType = [
    { id: 'by_hour', name: t('label.by_hour') },
    { id: 'by_month', name: t('label.by_month') },
  ];
  return (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-6">
            <Formik
              innerRef={wageRef}
              enableReinitialize
              initialValues={wage}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
                <form autoComplete="off">
                  <FormHeader text={t('label.wage_info')} />
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.wage_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-10'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_wage_code')}
                          />
                          <div
                            className="input-group-text col-2 d-flex justify-content-center"
                            id="basic-addon2"
                            type="button"
                            onClick={(e) => {
                              let randomCode = generateCode();
                              setFieldValue('code', randomCode);
                            }}
                          >
                            {t('label.random')}
                          </div>
                        </div>
                        {errors.code && touched.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.wage_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-12'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_wage_code')}
                          />
                        </div>
                        {errors.code && touched.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.wage_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_wage_name')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={t(errors.name)}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.type}
                      onBlur={handleBlur('type')}
                      onChange={(e) => {
                        handleChange('type')(e);
                      }}
                      inputID={'type'}
                      labelText={t('label.payment_method')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_contract_payment')}
                      lstSelectOptions={paymentType}
                      isRequiredField
                      isTouched={touched.type}
                      isError={errors.type && touched.type}
                      errorMessage={t(errors.type)}
                    />

                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.amount}
                      onBlur={handleBlur('amount')}
                      onChange={handleChange('amount')}
                      inputID={'amount'}
                      labelText={t('label.wage_amount')}
                      inputType={'number'}
                      placeholder={t('placeholder.enter_salary_level')}
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

export default WageItemBody;

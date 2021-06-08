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

const AllowanceItemBody = ({ t, allowanceRef, allowance, validationSchema, submitForm, buttons, loading, isCreate }) => {
  const type = [
    { id: 'tax', name: t('label.tax') },
    { id: 'no_tax', name: t('label.no_tax') },
    { id: 'partial_tax', name: t('label.partial_tax') },
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
                  <FormHeader text={t('label.allowance_info')} />
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.allowance_code')} required />
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
                            placeholder={t('placeholder.enter_allowance_code')}
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
                        <Label text={t('label.allowance_code')} required />
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
                            placeholder={t('placeholder.enter_allowance_code')}
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

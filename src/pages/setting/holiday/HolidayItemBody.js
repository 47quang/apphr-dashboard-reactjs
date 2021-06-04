import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { SettingHolidayInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const HolidayItemBody = ({ t, holidayRef, holiday, buttons, submitForm, loading, isCreate }) => {
  return (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-7">
            <Formik
              innerRef={holidayRef}
              enableReinitialize
              initialValues={holiday}
              validationSchema={SettingHolidayInfoSchema}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                <form>
                  <FormHeader text={t('label.holiday')} />
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.holiday')} required />
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
                            placeholder={t('placeholder.enter_role_code')}
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
                        <Label text={t('label.holiday')} required />
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
                            placeholder={t('placeholder.enter_role_code')}
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
                      value={values.title ?? ''}
                      onBlur={handleBlur('title')}
                      onChange={handleChange('title')}
                      inputID={'title'}
                      labelText={t('label.holiday_title')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_holiday_title')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.title}
                      isError={errors.title && touched.title}
                      errorMessage={t(errors.title)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.startDate ?? ''}
                      onBlur={handleBlur('startDate')}
                      onChange={handleChange('startDate')}
                      inputID={'startDate'}
                      labelText={t('label.start_date')}
                      inputType={'date'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.startDate}
                      isError={errors.startDate && touched.startDate}
                      errorMessage={t(errors.startDate)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.endDate ?? ''}
                      onBlur={handleBlur('endDate')}
                      onChange={handleChange('endDate')}
                      inputID={'endDate'}
                      labelText={t('label.end_date')}
                      inputType={'date'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.endDate}
                      isError={errors.endDate && touched.endDate}
                      errorMessage={t(errors.endDate)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.coefficient ?? '0'}
                      onBlur={handleBlur('coefficient')}
                      onChange={handleChange('coefficient')}
                      inputID={'coefficient'}
                      labelText={t('label.working_time_coefficient')}
                      inputType={'number'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.coefficient}
                      isError={errors.coefficient && touched.coefficient}
                      errorMessage={t(errors.coefficient)}
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

export default HolidayItemBody;

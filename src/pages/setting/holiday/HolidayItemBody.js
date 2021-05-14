import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { SettingHolidayInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const HolidayItemBody = ({ t, holidayRef, holiday, buttons, submitForm, loading }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
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
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <FormHeader text={t('label.holiday')} />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.code ?? ''}
                      onBlur={handleBlur('code')}
                      onChange={handleChange('code')}
                      inputID={'code'}
                      labelText={t('label.role_code')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_role_code')}
                      inputClassName={'form-control'}
                      isDisable={true}
                    />
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

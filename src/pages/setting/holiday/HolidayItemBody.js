import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { SettingHolidayInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const HolidayItemBody = ({ t, holidayRef, holiday, buttons, submitForm }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
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
                    containerClassName={'form-group col-lg-12'}
                    value={values.title}
                    onBlur={handleBlur('title')}
                    onChange={handleChange('title')}
                    inputID={'title'}
                    labelText={t('label.holiday_title')}
                    inputType={'text'}
                    placeholder={t('placeholder.holiday_title')}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.title}
                    isError={errors.title && touched.title}
                    errorMessage={errors.title}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.startDate}
                    onBlur={handleBlur('startDate')}
                    onChange={handleChange('startDate')}
                    inputID={'startDate'}
                    labelText={t('label.start_date')}
                    inputType={'datetime-local'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.startDate}
                    isError={errors.startDate && touched.startDate}
                    errorMessage={errors.startDate}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.endDate}
                    onBlur={handleBlur('endDate')}
                    onChange={handleChange('endDate')}
                    inputID={'endDate'}
                    labelText={t('label.end_date')}
                    inputType={'datetime-local'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.endDate}
                    isError={errors.endDate && touched.endDate}
                    errorMessage={errors.endDate}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.coefficient}
                    onBlur={handleBlur('coefficient')}
                    onChange={handleChange('coefficient')}
                    inputID={'coefficient'}
                    labelText={t('label.working_time_coefficient')}
                    inputType={'number'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.coefficient}
                    isError={errors.coefficient && touched.coefficient}
                    errorMessage={errors.coefficient}
                  />
                </div>
                {renderButtons(buttons)}
              </form>
            )}
          </Formik>
        </div>
        ;
      </div>
    </CContainer>
  );
};

export default HolidayItemBody;

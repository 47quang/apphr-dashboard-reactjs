import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { renderButtons } from 'src/utils/formUtils';

const WageItemBody = ({ t, wageRef, wage, validationSchema, submitForm, buttons }) => {
  const paymentType = [
    { id: 'one_time', name: 'Chi trả một lần' },
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
    { id: 'by_date', name: 'Chi trả theo ngày công' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
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
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-12'}
                    value={values.code}
                    onBlur={handleBlur('code')}
                    onChange={handleChange('code')}
                    inputID={'code'}
                    labelText={t('label.wage_code')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_wage_code')}
                    inputClassName={'form-control'}
                    isDisable={true}
                  />
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
                </div>
                <div className="row">
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
      </div>
    </CContainer>
  );
};

export default WageItemBody;

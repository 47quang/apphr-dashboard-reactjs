import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EnterNumber } from 'src/schema/formSchema';
import CommonTextInput from '../input/CommonTextInput';

const FilterNeedRenew = ({ handleFunction }) => {
  const { t } = useTranslation();
  let initValues = {
    days: 30,
  };
  return (
    <Formik
      initialValues={initValues}
      validationSchema={EnterNumber}
      enableReinitialize
      onSubmit={(values) => {
        handleFunction(values);
      }}
    >
      {(props) => {
        return (
          <Form className="p-3 m-0">
            <div className="row">
              <CommonTextInput
                containerClassName={'form-group col-xl-5 md-10'}
                value={props.values.days ?? ''}
                onBlur={props.handleBlur(`days`)}
                onChange={(e) => {
                  props.handleChange(`days`)(e);
                }}
                inputID={`number`}
                labelText={t('label.days_need_renew')}
                inputType={'number'}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={props.touched.days}
                isError={props.errors.days && props.touched.days}
                errorMessage={t(props.errors.days)}
              />

              <div className="col-xl-1 md-2 d-flex align-items-start pt-4 mt-1">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    props.handleSubmit();
                  }}
                  style={{ width: '95%' }}
                >
                  {t('label.search')}
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FilterNeedRenew;

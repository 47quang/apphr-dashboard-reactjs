import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SelectShift } from 'src/schema/formSchema';
import { fetchShifts } from 'src/stores/actions/shift';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const FilterPieChart = ({ initValues, handleFunction }) => {
  const { t } = useTranslation();
  const shifts = useSelector((state) => state.shift.shifts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShifts({ day: new Date(initValues.date).getDay() + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Formik
      initialValues={initValues}
      validationSchema={SelectShift}
      enableReinitialize
      onSubmit={(values) => {
        handleFunction(values);
      }}
    >
      {(props) => {
        props.isCreate = true;
        return (
          <Form className="p-0 m-0">
            <div className="row">
              <CommonTextInput
                containerClassName={'form-group col-xl-5'}
                value={props.values.date ?? ''}
                onBlur={props.handleBlur(`date`)}
                onChange={(e) => {
                  dispatch(fetchShifts({ day: new Date(e.target.value).getDay() + 1 }));
                  props.handleChange(`date`)(e);
                  props.setFieldValue('shiftId', '');
                }}
                inputID={`date`}
                labelText={t('label.start_date')}
                inputType={'date'}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={props.touched.date}
                isError={props.errors.date && props.touched.date}
                errorMessage={t(props.errors.date)}
              />
              <CommonSelectInput
                containerClassName={'form-group col-xl-5'}
                value={props.values.shiftId ?? ''}
                onBlur={props.handleBlur(`shiftId`)}
                onChange={(e) => {
                  // props.handleSubmit();
                  props.handleChange(`shiftId`)(e);
                }}
                inputID={`shiftId`}
                labelText={t('label.shift')}
                selectClassName={'form-control'}
                placeholder={t('placeholder.select_shift')}
                isRequiredField
                isTouched={props.touched.shiftId}
                isError={props.errors.shiftId && props.touched.shiftId}
                errorMessage={t(props.errors.shiftId)}
                lstSelectOptions={shifts?.payload ?? []}
              />
              <div className="col-xl-2 d-flex align-items-start pt-4 mt-1">
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

export default FilterPieChart;

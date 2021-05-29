import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SelectShift } from 'src/schema/formSchema';
import { fetchShifts } from 'src/stores/actions/shift';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const PieChart = ({ initValues, handleFunction }) => {
  const { t } = useTranslation();
  const shifts = useSelector((state) => state.shift.shifts);
  const chart = useSelector((state) => state.assignment.chart);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShifts({ day: new Date(initValues.date).getDay() + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('chart', chart);

  return (
    <CCard>
      <CCardHeader>{t('label.chart_shift_in_day')}</CCardHeader>
      <CCardBody>
        <Formik
          initialValues={initValues}
          validationSchema={SelectShift}
          enableReinitialize
          onSubmit={(values) => {
            if (values.shiftId !== '') setIsOpen(true);
            else setIsOpen(false);
            handleFunction(values);
          }}
        >
          {(props) => {
            props.isCreate = true;
            return (
              <Form className="p-0 m-0">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-5'}
                    value={props.values.date ?? ''}
                    onBlur={props.handleBlur(`date`)}
                    onChange={(e) => {
                      dispatch(fetchShifts({ day: new Date(e.target.value).getDay() + 1 }));
                      props.handleChange(`date`)(e);
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
                      props.handleChange(`shiftId`)(e);
                      props.handleSubmit();
                    }}
                    inputID={`shiftId`}
                    labelText={t('label.shift')}
                    selectClassName={'form-control'}
                    placeholder={t('placeholder.select_shift')}
                    isRequiredField
                    isTouched={props.touched.shiftId}
                    isError={props.errors.shiftId && props.touched.shiftId}
                    errorMessage={t(props.errors.shiftId)}
                    lstSelectOptions={shifts}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>

        {isOpen ? (
          <CChartPie
            datasets={[
              {
                backgroundColor: ['#caf7e3', '#f8ede3', '#f6dfeb', '#a1cae2', '#fdffbc', '#f4a9a8'],
                data: chart.data,
                hoverOffset: 100,
              },
            ]}
            labels={[
              t('label.number_normal_work'),
              t('label.number_remote_work'),
              t('label.number_remote_overtime_work'),
              t('label.number_overtime_work'),
              t('label.number_leave_work'),
              t('label.number_absence'),
            ]}
            options={{
              tooltips: {
                enabled: true,
              },

              layout: {
                padding: 30,
              },
            }}
          />
        ) : (
          <></>
        )}
      </CCardBody>
    </CCard>
  );
};

export default PieChart;

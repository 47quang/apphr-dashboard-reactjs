import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SelectShift } from 'src/schema/formSchema';
import { fetchShifts } from 'src/stores/actions/shift';
import StatisticAssignmentTable from '../dialog/StatisticAssignmentTable';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const PieChart = ({ initValues, handleFunction }) => {
  const { t } = useTranslation();
  const shifts = useSelector((state) => state.shift.shifts);
  const chart = useSelector((state) => state.assignment.chart);
  const [state, setState] = useState({
    isOpen: false,
    data: [],
    title: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShifts({ day: new Date(initValues.date).getDay() + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('chart', chart);
  const handleClick = (e, item) => {
    if (item && item.length > 0) {
      let index = item[0]._index;
      switch (index) {
        case 0: {
          setState({
            isOpen: true,
            title: t('title.list_working'),
            data: chart.payload.normal,
          });
          break;
        }
        case 1: {
          setState({
            isOpen: true,
            title: t('title.list_remote'),
            data: chart.payload.remote,
          });
          break;
        }
        case 2: {
          setState({
            isOpen: true,
            title: t('title.list_remote_overtime'),
            data: chart.payload.remote_overtime,
          });
          break;
        }
        case 3: {
          setState({
            isOpen: true,
            title: t('title.list_overtime'),
            data: chart.payload.overtime,
          });
          break;
        }
        case 4: {
          setState({
            isOpen: true,
            title: t('title.list_leave'),
            data: chart.payload.leave,
          });
          break;
        }
        case 5: {
          setState({
            isOpen: true,
            title: t('title.list_absent'),
            data: chart.payload.absent,
          });
          break;
        }
        default: {
        }
      }
    }
  };
  const handleClose = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return (
    <CCard>
      <CCardHeader>{t('label.chart_shift_in_day')}</CCardHeader>
      <CCardBody>
        {state.isOpen ? (
          <StatisticAssignmentTable t={t} isOpen={state.isOpen} handleClose={handleClose} data={state.data} title={state.title} />
        ) : (
          <></>
        )}
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
            // console.log('errors', props.errors);

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
                    lstSelectOptions={shifts}
                  />
                  <div className="col-xl-2 d-flex align-items-start pt-4 mt-1">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        props.handleSubmit();
                      }}
                    >
                      {t('label.search')}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
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
            onClick: handleClick,
            tooltips: {
              enabled: true,
            },
            legend: {
              position: 'left',
            },

            layout: {
              padding: 30,
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

export default PieChart;

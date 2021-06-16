import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import { Form, Formik } from 'formik';
import React from 'react';
import CommonTextInput from '../input/CommonTextInput';
import { DateRange } from 'src/schema/formSchema';
const GroupBarChart = ({ chart, title, t, initValues, handleFunction }) => {
  return (
    <CCard>
      <CCardHeader>
        <b>{title}</b>
      </CCardHeader>
      <CCardBody>
        <Formik
          initialValues={initValues}
          validationSchema={DateRange}
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
                    containerClassName={'form-group col-lg-5'}
                    value={props.values.from ?? ''}
                    onBlur={props.handleBlur(`from`)}
                    onChange={props.handleChange(`from`)}
                    inputID={`from`}
                    labelText={t('label.start_date')}
                    inputType={'date'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={props.touched.from}
                    isError={props.errors.from && props.touched.from}
                    errorMessage={t(props.errors.from)}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-5'}
                    value={props.values.to ?? ''}
                    onBlur={props.handleBlur(`to`)}
                    onChange={props.handleChange(`to`)}
                    inputID={`to`}
                    labelText={t('label.end_date')}
                    inputType={'date'}
                    isRequiredField
                    inputClassName={'form-control'}
                    isTouched={props.touched.to}
                    isError={props.errors.to && props.touched.to}
                    errorMessage={t(props.errors.to)}
                  />
                  <div className="col-lg-2 d-flex align-items-start pt-4 mt-1">
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

        <CChartBar
          datasets={chart.datasets}
          labels={chart.labels}
          // datasets={[
          //   {
          //     label: 'Blue',
          //     backgroundColor: 'blue',
          //     data: [3, 7, 4],
          //   },
          //   {
          //     label: 'Red',
          //     backgroundColor: 'red',
          //     data: [4, 3, 5],
          //   },
          //   {
          //     label: 'Green',
          //     backgroundColor: 'green',
          //     data: [7, 2, 6],
          //   },
          // ]}
          // labels={['Chocolate', 'Vanilla', 'Strawberry']}
          options={{
            tooltips: {
              enabled: true,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    // maxTicksLimit: Math.max(...data),
                    // stepSize: Math.ceil(Math.max(...data) / 8),
                    // max: Math.max(...data),
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

export default GroupBarChart;

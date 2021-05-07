import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import React from 'react';

const StackedBarChart = ({ labels, title, backgroundColor, datasets }) => {
  return (
    <CCard>
      <CCardHeader>{title}</CCardHeader>
      <CCardBody>
        <CChartBar
          datasets={datasets}
          labels={labels}
          options={{
            tooltips: {
              enabled: true,
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
              xAxes: [
                {
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

export default StackedBarChart;

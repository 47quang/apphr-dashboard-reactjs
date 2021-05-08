import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import React from 'react';

const BarChart = ({ labels, title, backgroundColor, data }) => {
  return (
    <CCard>
      <CCardHeader>{title}</CCardHeader>
      <CCardBody>
        <CChartBar
          datasets={[
            {
              label: '',
              backgroundColor: backgroundColor,
              data: data,
            },
          ]}
          labels={labels}
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
                    maxTicksLimit: Math.max(...data),
                    stepSize: Math.ceil(Math.max(...data) / 8),
                    max: Math.max(...data),
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

export default BarChart;

import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import React from 'react';

const LineChart = ({ labels, title, backgroundColor, data }) => {
  return (
    <CCard>
      <CCardHeader>{title}</CCardHeader>
      <CCardBody>
        <CChartLine
          datasets={[
            {
              label: 'Số giờ công tiêu chuẩn',
              borderColor: '#0000ff',
              fill: false,
              data: [160, 160, 160, 160, 170, 170, 170],
            },
            {
              label: 'Số giờ làm được',
              borderColor: '#2dd256',
              fill: false,
              data: [160, 150, 150, 160, 160, 160, 170],
            },
            {
              label: 'Số giờ làm thêm',
              borderColor: '#FF6384',
              fill: false,
              data: [15, 15, 15, 20, 10, 15, 10],
            },
          ]}
          options={{
            tooltips: {
              enabled: true,
            },
          }}
          labels="months"
        />
      </CCardBody>
    </CCard>
  );
};

export default LineChart;

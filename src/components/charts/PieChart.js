import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import React from 'react';

const PieChart = () => {
  return (
    <CCard>
      <CCardHeader>Biểu đồ thống kê ca làm việc trong tháng</CCardHeader>
      <CCardBody>
        <CChartPie
          datasets={[
            {
              backgroundColor: ['#8bcdcd', '#a7c5eb', '#efbbcf', '#d9e4dd', '#d8345f'],
              data: [40, 2, 1, 1, 1],
              hoverOffset: 100,
            },
          ]}
          labels={['Số ca đã làm', 'Số ca nghỉ có lương', 'Số ca nghỉ không lương', 'Số ca nghỉ chế độ', 'Vắng']}
          options={{
            tooltips: {
              enabled: true,
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

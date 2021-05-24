import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LineChart = ({ labels, title, backgroundColor, data }) => {
  const { t } = useTranslation();
  return (
    <CCard>
      <CCardHeader>{title}</CCardHeader>
      <CCardBody>
        <CChartLine
          datasets={[
            {
              label: t('label.standard_man_hours'),
              borderColor: '#0000ff',
              fill: false,
              data: [160, 160, 160, 160, 170, 170, 170],
            },
            {
              label: t('label.number_hours_worked'),
              borderColor: '#2dd256',
              fill: false,
              data: [160, 150, 150, 160, 160, 160, 170],
            },
            {
              label: t('label.overtime_hours'),
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

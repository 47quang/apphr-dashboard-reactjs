import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PieChart = () => {
  const { t } = useTranslation();
  return (
    <CCard>
      <CCardHeader>{t('label.chart_shift_in_month')}</CCardHeader>
      <CCardBody>
        <CChartPie
          datasets={[
            {
              backgroundColor: ['#8bcdcd', '#a7c5eb', '#efbbcf', '#d9e4dd', '#d8345f'],
              data: [40, 2, 1, 1, 1],
              hoverOffset: 100,
            },
          ]}
          labels={[
            t('label.number_shift_works'),
            t('label.number_paid_shift'),
            t('label.number_unpaid_shift'),
            t('label.number_policy_shift'),
            t('label.absence'),
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
      </CCardBody>
    </CCard>
  );
};

export default PieChart;

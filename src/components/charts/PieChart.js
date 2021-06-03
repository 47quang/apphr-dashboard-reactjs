import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setEmptyStatisticChart } from 'src/stores/actions/assignment';
import StatisticAssignmentTable from '../dialog/StatisticAssignmentTable';
import FilterPieChart from './FilterPieChart';

const equalChart = (prevChart, nextChart) => {
  return JSON.stringify(prevChart.datasets[0].data) === JSON.stringify(nextChart.datasets[0].data);
};

const MemoizedCChartPie = React.memo(CChartPie, equalChart);

const PieChart = ({ initValues, handleFunction }) => {
  const { t } = useTranslation();
  const chart = useSelector((state) => state.assignment.chart);
  const [state, setState] = useState({
    isOpen: false,
    data: [],
    title: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setEmptyStatisticChart());
    };
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
        <FilterPieChart initValues={initValues} handleFunction={handleFunction} />
        <MemoizedCChartPie
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

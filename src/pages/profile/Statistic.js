import { CCardGroup } from '@coreui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BarChart from 'src/components/charts/BarChart';
import PieChart from 'src/components/charts/PieChart';
import StackedBarChart from 'src/components/charts/StackedBarChart';
import ExportWage from 'src/components/dialog/ExportWage';
import { exportWage } from 'src/stores/actions/profile';
import { renderButtons } from 'src/utils/formUtils';
//TODO
const Statistic = ({ t, location, profileId }) => {
  const dispatch = useDispatch();
  const labelsRequest = [t('label.leave_pay_req'), t('label.leave_policy_req'), t('label.leave_no_pay_req'), 'Tăng ca', t('Overtime')];
  const backgroundColorRequest = ['#8bcdcd', '#a7c5eb', '#efbbcf', '#d9e4dd', '#d8345f'];
  const titleRequest = t('label.chart_number_requests_in_month');
  const dataRequest = [2, 0, 0, 3, 5];

  const labelsHours = [t('label.standard_working_hours'), t('label.number_hours_worked'), t('label.overtime_hours')];
  const backgroundColorHours = ['#8bcdcd', '#a7c5eb', '#efbbcf'];
  const titleHours = t('label.chart_hours_in_month');
  const dataHours = [160, 150, 25];

  const titleWorkHours = t('label.chart_hours_in_year');
  const labelsWorkHours = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'];
  const datasets = [
    {
      label: t('label.standard_working_time'),
      data: [160, 160, 160, 160, 170],
      borderColor: '#ff7171',
      type: 'line',
      fill: false,
    },
    {
      label: t('label.time_worked'),
      data: [160, 150, 150, 160, 30],
      backgroundColor: '#a6dcef',
    },
    {
      label: t('label.overtime_worked'),
      data: [15, 15, 15, 20, 2],
      backgroundColor: '#fdffbc',
    },
  ];
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const button = [
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        setIsOpenDialog(true);
      },
      name: t('label.export_wage'),
      position: 'right',
    },
  ];
  const handleConfirm = (values) => {
    setIsOpenDialog(false);
    dispatch(exportWage({ ...values, id: +profileId }, t('message.successful_export')));
  };
  const handleCancel = () => {
    setIsOpenDialog(false);
  };
  return (
    <>
      {isOpenDialog && <ExportWage isOpen={isOpenDialog} t={t} handleCancel={handleCancel} handleConfirm={handleConfirm} />}
      <div className="cols-1 m-2 p-2">{renderButtons(button)}</div>
      <CCardGroup columns className="cols-2 m-2 p-2">
        <PieChart />
        <BarChart labels={labelsHours} title={titleHours} backgroundColor={backgroundColorHours} data={dataHours} />
        <BarChart labels={labelsRequest} title={titleRequest} backgroundColor={backgroundColorRequest} data={dataRequest} />
        <StackedBarChart labels={labelsWorkHours} title={titleWorkHours} datasets={datasets} />
      </CCardGroup>
    </>
  );
};

export default Statistic;

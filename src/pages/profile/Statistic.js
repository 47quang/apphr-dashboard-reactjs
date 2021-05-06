import CIcon from '@coreui/icons-react';
import { CCardGroup, CWidgetDropdown } from '@coreui/react';
import React from 'react';
import BarChart from 'src/components/charts/BarChart';
import PieChart from 'src/components/charts/PieChart';

const Statistic = ({ t, location }) => {
  const labelsRequest = ['Nghỉ có lương', 'Nghỉ chế độ', 'Nghỉ không lương', 'Tăng ca', 'Làm thêm giờ'];
  const backgroundColorRequest = ['#8bcdcd', '#a7c5eb', '#efbbcf', '#d9e4dd', '#d8345f'];
  const titleRequest = 'Biểu đồ  thống kê số đề xuất trong tháng';
  const dataRequest = [2, 0, 0, 3, 5];

  const labelsHours = ['Tổng số giờ làm tiêu chuẩn', 'Tổng số giờ làm được', 'Tổng số giờ làm thêm'];
  const backgroundColorHours = ['#8bcdcd', '#a7c5eb', '#efbbcf'];
  const titleHours = 'Biểu đồ thống kê giờ làm trong tháng';
  const dataHours = [160, 150, 25];
  return (
    <>
      <CCardGroup columns className="cols-2 m-4 p-4">
        <PieChart />
        <BarChart labels={labelsHours} title={titleHours} backgroundColor={backgroundColorHours} data={dataHours} />
        <BarChart labels={labelsRequest} title={titleRequest} backgroundColor={backgroundColorRequest} data={dataRequest} />
      </CCardGroup>
    </>
  );
};

export default Statistic;

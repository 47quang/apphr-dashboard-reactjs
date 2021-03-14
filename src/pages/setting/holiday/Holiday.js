import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BasicLoader from 'src/components/loader/BasicLoader';
import QTable from 'src/components/table/Table';
import { changeActions } from 'src/stores/actions/header';

const columnDefOfRequestSetting = [
  { name: 'type', title: 'Loại đề xuất' },
  { name: 'total', title: 'Số ngày tối đa' },
];

const dataOfRequestSetting = [
  {
    id: 1,
    type: 'Nghỉ có phép',
    total: '12',
  },
  {
    id: 2,
    type: 'Nghỉ không phép',
    total: '2',
  },
  {
    id: 3,
    type: 'Nghỉ chế độ',
    total: '60',
  },
  {
    id: 4,
    type: 'Xin làm thêm',
    total: '5',
  },
];
const columnDef = [
  { name: 'title', title: 'Tiêu đề' },
  { name: 'start', title: 'Ngày bắt đầu' },
  { name: 'end', title: 'Ngày kế thúc' },
  { name: 'coefficient', title: 'Hệ số giờ làm' },
];

const data = [
  {
    id: 1,
    title: 'Tết Dương lịch',
    start: '2021-01-01',
    end: '2021-01-01',
    coefficient: 2,
  },
  {
    id: 2,
    title: 'Tết Âm lịch',
    start: '2021-02-23',
    end: '2021-02-23',
    coefficient: 2,
  },
  {
    id: 3,
    title: 'Giổ tổ Hùng Vương',
    start: '2021-03-30',
    end: '2021-03-30',
    coefficient: 2,
  },
  {
    id: 4,
    title: 'Ngày giải phóng miền Nam thống nhất Đất Nước',
    start: '2021-04-30',
    end: '2021-04-30',
    coefficient: 2,
  },
  {
    id: 5,
    title: 'Ngày quốc tế lao động',
    start: '2021-05-01',
    end: '2021-05-01',
    coefficient: 2,
  },
  {
    id: 6,
    title: 'Ngày quốc tế thiếu nhi',
    start: '2021-06-01',
    end: '2021-06-01',
    coefficient: 2,
  },
];

const HolidayPage = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isDefaultTab, setIsDefaultTab] = useState(true);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: () => history.push('/setting/holiday/newHoliday'),
      },
    ];
    if (isDefaultTab) {
      dispatch(changeActions(actions));
    }
  }, [isDefaultTab]);

  const handleChangeTab = (e) => {
    if ((e === 'holiday') !== isDefaultTab) {
      setIsDefaultTab(e === 'holiday');
      setIsLoading(true);
    }
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <CTabs activeTab="holiday" onActiveTabChange={handleChangeTab}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="holiday">Ngày nghỉ lễ</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="holidaySettings">Thiết lập số ngày nghỉ</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="holiday">
            {isLoading ? (
              <BasicLoader isVisible={isLoading} radius={10} />
            ) : (
              <QTable
                columnDef={columnDef}
                data={data}
                route={'/setting/holiday/tab1.id='}
                idxColumnsFilter={[0]}
                dateCols={[1, 2]}
              />
            )}
          </CTabPane>
          <CTabPane data-tab="holidaySettings">
            {isLoading ? (
              <BasicLoader isVisible={isLoading} radius={10} />
            ) : (
              <QTable
                columnDef={columnDefOfRequestSetting}
                data={dataOfRequestSetting}
                route={'/setting/holiday/tab2.id='}
                idxColumnsFilter={[0]}
              />
            )}
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  );
};
export default HolidayPage;

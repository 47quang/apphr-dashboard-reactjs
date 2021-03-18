import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import { TrendingUpRounded, TrendingUpTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { changeActions } from 'src/stores/actions/header';
import { deleteHoliday, fetchHolidays, fetchAllRequest } from 'src/stores/actions/holiday';

const columnDefOfRequestSetting = [
  { name: 'type', title: 'Loại đề xuất' },
  { name: 'amount', title: 'Số ngày tối đa' },
];

const columnDef = [
  { name: 'title', title: 'Tiêu đề' },
  { name: 'startDate', title: 'Ngày bắt đầu' },
  { name: 'endDate', title: 'Ngày kế thúc' },
  //{ name: 'coefficient', title: 'Hệ số giờ làm' },
];

const HolidayPage = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holiday.holidays);
  const requests = useSelector((state) => state.holiday.requests);
  const [isDefaultTab, setIsDefaultTab] = useState(true);

  useEffect(() => {
    dispatch(fetchHolidays());
    dispatch(fetchAllRequest());
  }, []);

  const handleChangeTab = (e) => {
    if ((e === 'holiday') !== isDefaultTab) {
      setIsDefaultTab(e === 'holiday');
    }
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteHoliday(rowId));
    dispatch(fetchHolidays());
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
            <QTable
              columnDef={columnDef}
              data={holidays}
              route={'/setting/holiday/tab1.id='}
              idxColumnsFilter={[0]}
              dateCols={[1, 2]}
              deleteRow={deleteRow}
            />
          </CTabPane>
          <CTabPane data-tab="holidaySettings">
            <QTable
              columnDef={columnDefOfRequestSetting}
              data={requests}
              route={'/setting/holiday/tab2.id='}
              idxColumnsFilter={[0]}
              disableCreate={true}
              disableDelete={true}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  );
};
export default HolidayPage;

import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteHoliday, fetchAllRequest, fetchHolidays } from 'src/stores/actions/holiday';

const HolidayPage = ({ t, location, history }) => {
  const columnDefOfRequestSetting = [
    { name: 'type', title: t('label.proposal_type') },
    { name: 'amount', title: t('label.maximum_day_amount') },
  ];

  const columnDef = [
    { name: 'code', title: t('label.holiday_code') },
    { name: 'title', title: t('label.holiday_title') },
    { name: 'startDate', title: t('label.start_date') },
    { name: 'endDate', title: t('label.end_date') },
    //{ name: 'coefficient', title: 'Hệ số giờ làm' },
  ];
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holiday.holidays);
  const requests = useSelector((state) => state.holiday.requests);
  const [isDefaultTab, setIsDefaultTab] = useState(true);

  useEffect(() => {
    dispatch(fetchHolidays());
    dispatch(fetchAllRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTab = (e) => {
    if ((e === 'holiday') !== isDefaultTab) {
      setIsDefaultTab(e === 'holiday');
    }
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteHoliday(rowId, t('message.successful_delete')));
    dispatch(fetchHolidays());
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <CTabs activeTab="holiday" onActiveTabChange={handleChangeTab}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="holiday">{t('label.holiday')}</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="holidaySettings">{t('label.holiday_setting')}</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="holiday">
            <QTable
              t={t}
              columnDef={columnDef}
              data={holidays}
              route={ROUTE_PATH.HOLIDAY + '/tab1.id='}
              idxColumnsFilter={[1]}
              dateCols={[3, 2]}
              deleteRow={deleteRow}
            />
          </CTabPane>
          <CTabPane data-tab="holidaySettings">
            <QTable
              t={t}
              columnDef={columnDefOfRequestSetting}
              data={requests}
              route={ROUTE_PATH.HOLIDAY + '/tab2.id='}
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

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
    { name: 'code', title: t('label.holiday_code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'title', title: t('label.holiday_title'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'startDate', title: t('label.start_date'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'endDate', title: t('label.end_date'), align: 'left', width: '20%', wordWrapEnabled: true },
    //{ name: 'coefficient', title: 'Hệ số giờ làm' },
  ];
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holiday.holidays);
  const requests = useSelector((state) => state.holiday.requests);
  const [isDefaultTab, setIsDefaultTab] = useState(true);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
  });
  const onCurrentPageChange = (pageNumber) =>
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));

  useEffect(() => {
    dispatch(
      fetchHolidays(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
      ),
    );
    dispatch(fetchAllRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

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
              paging={paging}
              onCurrentPageChange={onCurrentPageChange}
              onPageSizeChange={onPageSizeChange}
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
              paging={paging}
              onCurrentPageChange={onCurrentPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  );
};
export default HolidayPage;

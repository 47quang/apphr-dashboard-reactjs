import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';

const HolidaySetting = ({ t, location, history }) => {
  const columnDef = [
    { name: 'id', title: t('label.id'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'label', title: t('label.proposal_type'), align: 'left', width: '45%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.maximum_day_amount'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  const requests = [
    {
      id: 1,
      label: t('label.day_offs_in_year'),
      amount: 12,
    },
    {
      id: 2,
      label: t('label.number_of_overtime'),
      amount: 12,
    },
    {
      id: 3,
      label: t('label.number_of_remote'),
      amount: 12,
    },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,

    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
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
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_HOLIDAY)) {
      // dispatch(
      //   fetchAllRequest(
      //     {
      //       page: paging.currentPage,
      //       perpage: paging.pageSize,
      //     },
      //     onTotalChange,
      //   ),
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  if (permissionIds.includes(PERMISSION.LIST_HOLIDAY))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={requests}
          route={ROUTE_PATH.HOLIDAY + '/tab2.id='}
          idxColumnsFilter={[0]}
          disableCreate={true}
          disableDelete={true}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default HolidaySetting;

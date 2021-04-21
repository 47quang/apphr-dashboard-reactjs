import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';

const HolidaySetting = ({ t, location, history }) => {
  const columnDef = [
    { name: 'id', title: t('label.id'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'label', title: t('label.proposal_type'), align: 'left', width: '45%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.maximum_day_amount'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  //const dispatch = useDispatch();
  // const requests = useSelector((state) => state.holiday.requests);
  const requests = [
    {
      id: 1,
      label: 'Số ngày nghỉ phép trong năm',
      amount: 12,
    },
    {
      id: 2,
      label: 'Số giờ tăng ca tối đa trong tháng',
      amount: 12,
    },
    {
      id: 3,
      label: 'Số ngày làm việc từ xa trong tháng',
      amount: 12,
    },
  ];
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
  // const onTotalChange = (total) =>
  //   setPaging((prevState) => ({
  //     ...prevState,
  //     total: total,
  //   }));

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

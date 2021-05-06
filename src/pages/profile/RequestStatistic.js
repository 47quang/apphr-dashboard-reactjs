import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';

const RequestStatistic = ({ t, location, history }) => {
  const columnDef = [
    { name: 'type', title: t('label.request_type'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'total', title: t('label.total_request'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'used', title: t('label.number_of_used_request'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'remain', title: t('label.number_of_remain_request'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  //const dispatch = useDispatch();
  // const requests = useSelector((state) => state.holiday.requests);
  const requests = [
    {
      id: 1,
      type: 'Số ngày nghỉ phép trong năm',
      total: 12,
      used: 6,
      remain: 6,
    },
    {
      id: 2,
      type: 'Số giờ tăng ca tối đa trong tháng',
      total: 12,
      used: 6,
      remain: 6,
    },
    {
      id: 3,
      type: 'Số ngày làm việc từ xa trong tháng',
      total: 12,
      used: 6,
      remain: 6,
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
          disableEditColum={true}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default RequestStatistic;

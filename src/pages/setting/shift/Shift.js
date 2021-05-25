import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deleteShift, fetchShifts } from 'src/stores/actions/shift';

const Shifts = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDef = [
    { name: 'code', title: t('label.shift_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.shift_name'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'startCC', title: t('label.check_in_time'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'endCC', title: t('label.check_out_time'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'coefficient', title: t('label.working_time_coefficient'), align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
  });
  const filters = {
    code: {
      title: t('label.shift_code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    name: {
      title: t('label.shift_name'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
  };
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
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_SHIFT))
      dispatch(fetchShifts({ page: paging.currentPage, perpage: paging.pageSize }, onTotalChange, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const filterFunction = (params) => {
    dispatch(
      fetchShifts(
        {
          ...params,
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  const handleAfterDelete = () => {
    dispatch(fetchShifts({ page: paging.currentPage, perpage: paging.pageSize }, onTotalChange, setLoading));
  };
  const deleteRow = (rowID) => {
    dispatch(deleteShift({ id: rowID }, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_SHIFT))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={shifts}
          route={ROUTE_PATH.SHIFT + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_SHIFT)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_SHIFT)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_SHIFT)}
          filters={filters}
          filterFunction={filterFunction}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default Shifts;

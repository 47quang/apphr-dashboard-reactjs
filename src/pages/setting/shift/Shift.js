import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteShift, fetchShifts } from 'src/stores/actions/shift';

const Shifts = ({ t, location, history }) => {
  const columnDef = [
    { name: 'code', title: t('label.shift_code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.shift_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'startCC', title: t('label.check_in_time'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'endCC', title: t('label.check_out_time'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'coefficient', title: t('label.working_time_coefficient'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
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
    dispatch(fetchShifts({ page: paging.currentPage, perpage: paging.pageSize }, onTotalChange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = (rowID) => {
    dispatch(deleteShift({ id: rowID }, t('message.successful_delete')));
  };

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
      />
    </CContainer>
  );
};
export default Shifts;

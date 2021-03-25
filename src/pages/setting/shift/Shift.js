import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteShift, fetchShifts } from 'src/stores/actions/shift';

const Shifts = ({ t, location, history }) => {
  const columnDef = [
    { name: 'shortname', title: t('label.shift_code') },
    { name: 'name', title: t('label.shift_name') },
    { name: 'startCC', title: t('label.check_in_time') },
    { name: 'endCC', title: t('label.check_out_time') },
    { name: 'coefficient', title: t('label.working_time_coefficient') },
  ];
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);

  useEffect(() => {
    dispatch(
      fetchShifts({
        page: 0,
        perpage: 1000,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = (rowID) => {
    dispatch(deleteShift({ id: rowID }, t('message.successful_delete')));
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={shifts} route={ROUTE_PATH.SHIFT + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
export default Shifts;

import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLoader from 'src/components/loader/BasicLoader';
import QTable from 'src/components/table/Table';
import { changeActions } from 'src/stores/actions/header';
import { deleteShift, fetchShifts } from 'src/stores/actions/shift';

const Shifts = ({ t, location }) => {
  const columnDef = [
    { name: 'shortname', title: 'Mã ca làm' },
    { name: 'name', title: 'Tên ca làm' },
    { name: 'startCC', title: 'Giờ Check-in' },
    { name: 'endCC', title: 'Giờ Check-out' },
    { name: 'coefficient', title: 'Hệ số giờ làm' },
  ];
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const [isLoading, setIsLoading] = useState(true);
  const wait = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    wait();
    dispatch(
      fetchShifts({
        page: 0,
        perpage: 1000,
      }),
    );
    const actions = [
      {
        type: 'primary',
        name: 'Tạo ca làm',
        to: '/setting/shift/newShift',
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
      clearTimeout(wait);
    };
  }, []);
  const handleDeleteRow = (rowID) => {
    setIsLoading(true);

    dispatch(deleteShift(rowID));
    wait();
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <QTable
          columnDef={columnDef}
          data={shifts}
          route={'/setting/shift/id='}
          idxColumnsFilter={[0, 1]}
          handleDeleteRow={(rowID) => {
            handleDeleteRow(rowID);
          }}
        />
      )}
    </CContainer>
  );
};
export default Shifts;

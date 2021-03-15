import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { fetchShift, resetShift } from 'src/stores/actions/shift';
import ShiftItemBody from './ShiftItemBody';
//TODO: translate

const UpdateShift = ({ t, location, match }) => {
  const shiftRef = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);
  useEffect(() => {
    dispatch(fetchShift(match?.params?.id));
    dispatch(
      fetchBranches({
        page: 0,
        perpage: 1000,
      }),
    );
    const actions = [
      {
        type: 'primary',
        name: 'Cập nhật',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
      dispatch(resetShift());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    shiftRef.current.handleSubmit(e);
  };
  console.log(shift);
  return <ShiftItemBody shiftRef={shiftRef} shift={shift} validationSchema={SettingShiftInfoSchema} branches={branches} isUpdate={true} />;
};

export default UpdateShift;

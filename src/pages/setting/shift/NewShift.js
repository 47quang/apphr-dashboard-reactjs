import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { resetShift } from 'src/stores/actions/shift';
import { REDUX_STATE } from 'src/stores/states';
import ShiftItemBody from './ShiftItemBody';

const NewShift = ({ t, location, history }) => {
  const shiftRef = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);

  useEffect(() => {
    dispatch({ type: REDUX_STATE.shift.EMPTY_VALUE });
    dispatch(
      fetchBranches({
        page: 0,
        perpage: 1000,
      }),
    );
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
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
  return <ShiftItemBody shiftRef={shiftRef} shift={shift} validationSchema={SettingShiftInfoSchema} branches={branches} isUpdate={false} />;
};

export default NewShift;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { createNewShift, resetShift } from 'src/stores/actions/shift';
import { REDUX_STATE } from 'src/stores/states';
import { convertTimeWithSecond, enCodeChecked } from './shiftFunctionUtil';
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

    return () => {
      dispatch(changeActions([]));
      dispatch(resetShift());
    };
  }, [dispatch]);

  const submitForm = (values) => {
    let form = values;

    form.operateLoop = enCodeChecked(form.operateLoop);
    form.startCC = convertTimeWithSecond(form.startCC);
    form.endCC = convertTimeWithSecond(form.endCC);
    dispatch(createNewShift(form, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(`/setting/shift`);
      },
      name: 'Quay lại',
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        shiftRef.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];
  return (
    <ShiftItemBody
      shiftRef={shiftRef}
      shift={shift}
      validationSchema={SettingShiftInfoSchema}
      branches={branches}
      buttons={buttons}
      submitForm={submitForm}
    />
  );
};

export default NewShift;

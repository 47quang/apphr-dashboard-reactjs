import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { fetchShift, resetShift, updateShift } from 'src/stores/actions/shift';
import { convertTimeWithSecond, enCodeChecked } from './shiftFunctionUtil';
import ShiftItemBody from './ShiftItemBody';
//TODO: translate

const UpdateShift = ({ t, location, match, history }) => {
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
    return () => {
      dispatch(changeActions([]));
      dispatch(resetShift());
    };
  }, []);
  const submitForm = (values) => {
    let form = values;

    form.operateLoop = enCodeChecked(form.operateLoop);
    form.startCC = convertTimeWithSecond(form.startCC);
    form.endCC = convertTimeWithSecond(form.endCC);
    dispatch(updateShift(form));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(`/setting/shift`);
      },
      name: 'Quay lại',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        shiftRef.current.handleReset(e);
      },
      name: 'Reset',
    },
    {
      type: 'submit',
      className: `btn btn-primary`,
      onClick: (e) => {
        shiftRef.current.handleSubmit(e);
      },
      name: 'Cập nhật',
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

export default UpdateShift;

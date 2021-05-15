import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { createNewShift, resetShift } from 'src/stores/actions/shift';
import { REDUX_STATE } from 'src/stores/states';
import { parseUTCTime } from 'src/utils/datetimeUtils';
import { enCodeChecked } from './shiftFunctionUtil';
import ShiftItemBody from './ShiftItemBody';

const NewShift = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const shiftRef = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_SHIFT)) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const submitForm = (values) => {
    let form = values;
    form.operateLoop = enCodeChecked(form.operateLoop);
    form.startCC = parseUTCTime(form.startCC);
    form.endCC = parseUTCTime(form.endCC);
    form.branchId = parseInt(form.branchId);
    dispatch(createNewShift(form, history, t('message.successful_create')));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.SHIFT);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        shiftRef.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_SHIFT))
    return (
      <ShiftItemBody
        t={t}
        shiftRef={shiftRef}
        shift={shift}
        validationSchema={SettingShiftInfoSchema}
        branches={branches}
        buttons={buttons}
        submitForm={submitForm}
      />
    );
  else return <Page404 />;
};

export default NewShift;

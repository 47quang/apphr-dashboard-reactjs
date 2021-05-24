import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { fetchShift, resetShift, updateShift } from 'src/stores/actions/shift';
import { parseUTCTime } from 'src/utils/datetimeUtils';
import { enCodeChecked } from './shiftFunctionUtil';
import ShiftItemBody from './ShiftItemBody';

const UpdateShift = ({ t, location, match, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const shiftRef = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_SHIFT)) {
      dispatch(fetchShift(match?.params?.id, setLoading));
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
  }, []);
  const submitForm = (values) => {
    let form = values;

    form.operateLoop = enCodeChecked(form.operateLoop);
    form.startCC = parseUTCTime(form.startCC);
    form.endCC = parseUTCTime(form.endCC);
    dispatch(updateShift(form, t('message.successful_update')));
  };

  const buttons = permissionIds.includes(PERMISSION.UPDATE_SHIFT)
    ? [
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
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            shiftRef.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            shiftRef.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.SHIFT);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_SHIFT))
    return (
      <ShiftItemBody
        t={t}
        shiftRef={shiftRef}
        shift={shift}
        validationSchema={SettingShiftInfoSchema}
        branches={branches}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateShift;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';
import { fetchPosition, setEmptyPosition, updatePosition } from 'src/stores/actions/position';
import { fetchShifts } from 'src/stores/actions/shift';
import PositionItemBody from './PositionItemBody';

const UpdatePosition = ({ t, location, match, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const params = match.params;
  const positionRef = useRef();
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const departments = useSelector((state) => state.department.departments);
  const branches = useSelector((state) => state.branch.branches);
  const position = useSelector((state) => state.position.position);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_POSITION)) {
      dispatch(fetchPosition(params.id));
      dispatch(fetchShifts());
      dispatch(fetchBranches());
      dispatch(fetchDepartments());
      return () => {
        dispatch(changeActions([]));
        dispatch(setEmptyPosition());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    dispatch(updatePosition(form, params.id, t('message.successful_update')));
  };

  const buttons = permissionIds.includes(PERMISSION.UPDATE_POSITION)
    ? [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.POSITION);
          },
          name: t('label.back'),
          position: 'left',
        },
        {
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            positionRef.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            positionRef.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.POSITION);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_POSITION))
    return (
      <PositionItemBody
        t={t}
        positionRef={positionRef}
        position={position}
        departments={departments}
        branches={branches}
        shifts={shifts}
        submitForm={submitForm}
        buttons={buttons}
      />
    );
  else return <Page404 />;
};

export default UpdatePosition;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';
import { fetchPosition, setEmptyPosition, updatePosition } from 'src/stores/actions/position';
import { fetchShifts } from 'src/stores/actions/shift';
import PositionItemBody from './PositionItemBody';

const UpdatePosition = ({ t, location, match, history }) => {
  const params = match.params;
  const positionRef = useRef();
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const departments = useSelector((state) => state.department.departments);
  const branches = useSelector((state) => state.branch.branches);
  const position = useSelector((state) => state.position.position);

  useEffect(() => {
    dispatch(fetchPosition(params.id));
    dispatch(fetchShifts());
    dispatch(fetchBranches());
    dispatch(fetchDepartments());
    return () => {
      dispatch(changeActions([]));
      dispatch(setEmptyPosition());
    };
  }, []);

  const submitForm = (values) => {
    let form = values;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    dispatch(updatePosition(form, params.id));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.POSITION);
      },
      name: 'Quay lại',
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        positionRef.current.handleReset(e);
      },
      name: 'Hoàn tác',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        positionRef.current.handleSubmit(e);
      },
      name: 'Cập nhật',
    },
  ];

  return (
    <PositionItemBody
      positionRef={positionRef}
      position={position}
      departments={departments}
      branches={branches}
      shifts={shifts}
      submitForm={submitForm}
      buttons={buttons}
    />
  );
};

export default UpdatePosition;

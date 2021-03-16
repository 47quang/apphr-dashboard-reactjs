import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { createPosition, setEmptyPosition } from 'src/stores/actions/position';
import { fetchShifts } from 'src/stores/actions/shift';
import PositionItemBody from './PositionItemBody';

const NewPositionPage = ({ t, location, match, history }) => {
  const positionRef = useRef();
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const departments = useSelector((state) => state.department.departments);
  const branches = useSelector((state) => state.branch.branches);
  const position = useSelector((state) => state.position.position);

  useEffect(() => {
    dispatch(fetchBranches());
    return () => {
      dispatch(setEmptyPosition());
    };
  }, []);

  const submitForm = (values) => {
    const form = values;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    dispatch(createPosition(form, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(`/setting/position/`);
      },
      name: 'Quay lại',
    },
    {
      type: 'submit',
      className: `btn btn-primary`,
      onClick: (e) => {
        positionRef.current.handleSubmit(e);
      },
      name: 'Tạo mới',
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

export default NewPositionPage;

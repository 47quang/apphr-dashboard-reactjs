import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from 'src/stores/actions/branch';
import { resetDepartment } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';
import DepartmentItemBody from './DepartmentItemBody';

const NewDepartment = ({ t, location }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
    return () => {
      dispatch(changeActions([]));
      dispatch(resetDepartment());
    };
  }, []);

  const handleSubmit = (e) => {
    departmentRef.current.handleSubmit(e);
  };

  return <DepartmentItemBody departmentRef={departmentRef} department={department} branches={branches} isUpdate={false} />;
};

export default NewDepartment;

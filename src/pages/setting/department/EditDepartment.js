import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartment, resetDepartment } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';
import DepartmentItemBody from './DepartmentItemBody';

const EditDepartment = ({ t, location, match }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Cập nhật',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
    dispatch(fetchDepartment({ id: match.params.id }));
    return () => {
      dispatch(changeActions([]));
      dispatch(resetDepartment());
    };
  }, []);
  const handleSubmit = (e) => {
    departmentRef.current.handleSubmit(e);
  };

  return <DepartmentItemBody departmentRef={departmentRef} department={department} branches={branches} isUpdate={true} />;
};

export default EditDepartment;

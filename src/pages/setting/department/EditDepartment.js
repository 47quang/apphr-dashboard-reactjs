import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartment, resetDepartment, updateDepartment } from 'src/stores/actions/department';
import DepartmentItemBody from './DepartmentItemBody';

const EditDepartment = ({ t, location, match, history }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDepartment({ id: match.params.id }));
    return () => {
      dispatch(resetDepartment());
    };
  }, []);

  const submitForm = (values) => {
    const form = values;
    form.branchId = parseInt(form.branchId);

    dispatch(updateDepartment(form));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push('/setting/department');
      },
      name: 'Quay lại',
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        departmentRef.current.handleReset(e);
      },
      name: 'Hoàn tác',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        departmentRef.current.handleSubmit(e);
      },
      name: 'Cập nhật',
    },
  ];
  return <DepartmentItemBody departmentRef={departmentRef} department={department} branches={branches} submitForm={submitForm} buttons={buttons} />;
};

export default EditDepartment;

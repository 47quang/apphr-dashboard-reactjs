import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from 'src/stores/actions/branch';
import { createDepartment, resetDepartment } from 'src/stores/actions/department';
import DepartmentItemBody from './DepartmentItemBody';

const NewDepartment = ({ t, location, history }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    dispatch(fetchBranches());
    return () => {
      dispatch(resetDepartment());
    };
  }, []);

  const submitForm = (values) => {
    const form = values;
    form.branchId = parseInt(form.branchId);

    dispatch(createDepartment(form, history));
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
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        departmentRef.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];

  return <DepartmentItemBody departmentRef={departmentRef} department={department} branches={branches} buttons={buttons} submitForm={submitForm} />;
};

export default NewDepartment;

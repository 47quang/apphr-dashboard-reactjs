import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { fetchBranches } from 'src/stores/actions/branch';
import { createDepartment, resetDepartment } from 'src/stores/actions/department';
import DepartmentItemBody from './DepartmentItemBody';

const NewDepartment = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_DEPARTMENT)) {
      dispatch(fetchBranches());
      return () => {
        dispatch(resetDepartment());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    const form = values;
    form.branchId = parseInt(form.branchId);

    dispatch(createDepartment(form, history, t('message.successful_create')));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.DEPARTMENT);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        departmentRef.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_DEPARTMENT))
    return (
      <DepartmentItemBody
        t={t}
        departmentRef={departmentRef}
        department={department}
        branches={branches}
        buttons={buttons}
        submitForm={submitForm}
        isCreate={true}
      />
    );
  else return <Page404 />;
};

export default NewDepartment;

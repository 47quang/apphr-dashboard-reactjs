import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRole, setEmptyRole, fetchPermissions } from 'src/stores/actions/role';
import RoleItemBody from './RoleItemBody';

//TODO: translate

const NewRole = ({ t, location, history }) => {
  const roleInfoForm = useRef();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const permissions = useSelector((state) => state.role.permissions);

  useEffect(() => {
    dispatch(setEmptyRole());
    dispatch(fetchPermissions());
  }, []);

  const submitForm = (values) => {
    let { name, permissions } = values;
    console.log('Submit value: ', permissions, name);
    dispatch(createRole({ name, permissions }, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push('/setting/role');
      },
      name: 'Quay lại',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        roleInfoForm.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];

  return <RoleItemBody roleRef={roleInfoForm} role={role} buttons={buttons} submitForm={submitForm} permissions={permissions} />;
};

export default NewRole;

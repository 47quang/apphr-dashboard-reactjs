import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
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
    let { name, permissionIds } = values;
    dispatch(createRole({ name, permissionIds }, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.ROLE);
      },
      name: 'Quay lại',
      position: 'left',
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

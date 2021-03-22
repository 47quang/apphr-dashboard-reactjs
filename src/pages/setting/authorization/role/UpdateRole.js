import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole, setEmptyRole, fetchPermissions, fetchRole } from 'src/stores/actions/role';
import RoleItemBody from './RoleItemBody';

//TODO: translate

const UpdateRole = ({ t, location, history, match }) => {
  const roleInfoForm = useRef();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const permissions = useSelector((state) => state.role.permissions);

  useEffect(() => {
    dispatch(fetchPermissions());
    dispatch(fetchRole(match?.params?.id));
  }, []);

  const submitForm = (values) => {
    let { id, name, permissionIds } = values;
    dispatch(updateRole({ id, name, permissionIds }, history));
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
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        roleInfoForm.current.handleReset(e);
      },
      name: 'Reset',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        roleInfoForm.current.handleSubmit(e);
      },
      name: 'Cập nhật',
    },
  ];
  return <RoleItemBody roleRef={roleInfoForm} role={role} buttons={buttons} submitForm={submitForm} permissions={permissions} />;
};

export default UpdateRole;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { updateRole, setEmptyRole, fetchPermissions, fetchRole } from 'src/stores/actions/role';
import RoleItemBody from './RoleItemBody';

//TODO: translate

const UpdateRole = ({ t, location, history, match }) => {
  const roleInfoForm = useRef();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const permissions = useSelector((state) => state.role.permissions);

  useEffect(() => {
    dispatch(setEmptyRole());
    dispatch(fetchPermissions());
    dispatch(fetchRole(match?.params?.id));
  }, []);

  const submitForm = (values) => {
    let form = values;
    delete form.id;
    // console.log(form);
    dispatch(updateRole(form, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.ROLE);
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

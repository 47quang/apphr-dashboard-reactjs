import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { createRole, fetchPermissions, setEmptyRole } from 'src/stores/actions/role';
import RoleItemBody from './RoleItemBody';

const NewRole = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const roleInfoForm = useRef();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const permissions = useSelector((state) => state.role.permissions);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_ROLE)) {
      dispatch(setEmptyRole());
      dispatch(fetchPermissions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    dispatch(createRole(values, history, t('message.successful_create')));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.ROLE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        roleInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_ROLE))
    return (
      <RoleItemBody t={t} roleRef={roleInfoForm} role={role} buttons={buttons} submitForm={submitForm} permissions={permissions} isCreate={true} />
    );
  else return <Page404 />;
};

export default NewRole;

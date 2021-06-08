import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { fetchPermissions, fetchRole, updateRole } from 'src/stores/actions/role';
import RoleItemBody from './RoleItemBody';

const UpdateRole = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const roleInfoForm = useRef();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const permissions = useSelector((state) => state.role.permissions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_ROLE)) {
      if (permissions && permissions.length === 0) dispatch(fetchPermissions());
      dispatch(fetchRole(match?.params?.id, setLoading));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let { id, name, permissionIds } = values;
    dispatch(updateRole({ id, name, permissionIds }, t('message.successful_update')));
  };

  const buttons = permissionIds.includes(PERMISSION.UPDATE_DEPARTMENT)
    ? [
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
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            roleInfoForm.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            roleInfoForm.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.ROLE);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_ROLE))
    return (
      <RoleItemBody
        t={t}
        roleRef={roleInfoForm}
        role={role}
        buttons={buttons}
        submitForm={submitForm}
        permissions={permissions}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateRole;

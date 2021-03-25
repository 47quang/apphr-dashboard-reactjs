import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchAccount, fetchPermissionGroups, fetchRoles } from 'src/stores/actions/account';
import AccountItemBody from './AccountItemBody';

//TODO: translate

const UpdateAccount = ({ t, location, history, match }) => {
  const accountInfoForm = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const permissionGroups = useSelector((state) => state.account.permissionGroups);
  const roles = useSelector((state) => state.account.roles);

  useEffect(() => {
    dispatch(fetchAccount(match?.params?.id));
    dispatch(fetchRoles());
    // if (account.roleId !== 0) dispatch(fetchRole(49));
    dispatch(fetchPermissionGroups());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    console.log(form);
    //dispatch(updateAccount(form, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.ACCOUNT);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        accountInfoForm.current.handleReset(e);
      },
      name: t('label.reset'),
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        accountInfoForm.current.handleSubmit(e);
      },
      name: t('label.update'),
    },
  ];

  return (
    <AccountItemBody
      t={t}
      accountRef={accountInfoForm}
      account={account}
      buttons={buttons}
      submitForm={submitForm}
      permissionGroups={permissionGroups}
      roles={roles}
    />
  );
};

export default UpdateAccount;

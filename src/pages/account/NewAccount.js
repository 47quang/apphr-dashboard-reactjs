import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { createAccount, fetchPermissionGroups, fetchRoles, setEmptyAccount, fetchProfiles } from 'src/stores/actions/account';
import AccountItemBody from './AccountItemBody';

//TODO: translate

const NewAccount = ({ t, location, history }) => {
  const accountInfoForm = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const permissionGroups = useSelector((state) => state.account.permissionGroups);
  const roles = useSelector((state) => state.account.roles);
  const profiles = useSelector((state) => state.account.account.profiles);

  useEffect(() => {
    dispatch(setEmptyAccount());
    dispatch(fetchRoles());
    dispatch(fetchPermissionGroups());
    dispatch(fetchProfiles({ fields: ['firstname', 'shortname'] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    delete form.id;
    console.log(form);
    form.roleId = parseInt(form.roleId);
    dispatch(createAccount(form, history));
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
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        accountInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  console.log(roles);
  return (
    <AccountItemBody
      t={t}
      accountRef={accountInfoForm}
      account={account}
      buttons={buttons}
      submitForm={submitForm}
      permissionGroups={permissionGroups}
      profiles={profiles}
      roles={roles}
    />
  );
};

export default NewAccount;

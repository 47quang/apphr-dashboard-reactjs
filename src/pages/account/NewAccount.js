import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActions } from 'src/stores/actions/header';
import { createAccount, setEmptyAccount, fetchRoles } from 'src/stores/actions/account';
import AccountItemBody from './AccountItemBody';

//TODO: translate

const NewAccount = ({ t, location, history }) => {
  const accountInfoForm = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const permissions = useSelector((state) => state.account.permissions);
  const roles = useSelector((state) => state.account.roles);

  useEffect(() => {
    dispatch(setEmptyAccount());
    dispatch(fetchRoles());
  }, []);

  const submitForm = (values) => {
    let form = values;
    delete form.id;
    console.log(form);
    //dispatch(createAccount(form, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push('/account');
      },
      name: 'Quay lại',
    },
    {
      type: 'submit',
      className: `btn btn-primary`,
      onClick: (e) => {
        accountInfoForm.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];

  return (
    <AccountItemBody
      accountRef={accountInfoForm}
      account={account}
      buttons={buttons}
      submitForm={submitForm}
      permissions={permissions}
      roles={roles}
    />
  );
};

export default NewAccount;

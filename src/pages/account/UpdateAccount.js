import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { AccountUpdateInfoSchema } from 'src/schema/formSchema';
import { fetchAccount, fetchPermissionGroups, fetchProfiles, fetchRoles, updateAccount } from 'src/stores/actions/account';
import { REDUX_STATE } from 'src/stores/states';
import AccountItemBody from './AccountItemBody';

//TODO: translate

const UpdateAccount = ({ t, location, history, match }) => {
  const accountInfoForm = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const permissionGroups = useSelector((state) => state.account.permissionGroups);
  const roles = useSelector((state) => state.account.roles);
  const profiles = useSelector((state) => state.account.profiles);
  let permissionIds = [];

  useEffect(() => {
    dispatch(fetchAccount(match?.params?.id));
    dispatch(fetchRoles());
    dispatch(fetchPermissionGroups());
    dispatch(fetchProfiles({ fields: ['id', 'firstname', 'lastname', 'shortname'] }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (account.roleId !== 0) {
      permissionIds = roles.filter((x) => x.id === account.roleId)[0]?.permissionIds;
      permissionIds = permissionIds && permissionIds.length > 0 ? permissionIds.map((val) => +val) : [];
      dispatch({
        type: REDUX_STATE.account.GET_PERMISSION_ARRAY,
        payload: permissionIds,
      });
    }
  }, [account.roleId]);

  const submitForm = (values) => {
    let form = values;
    dispatch(updateAccount(form, history, t('message.successful_update_account')));
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
      isCreate={false}
      accountRef={accountInfoForm}
      account={account}
      buttons={buttons}
      submitForm={submitForm}
      permissionGroups={permissionGroups}
      roles={roles}
      profiles={profiles}
      schema={AccountUpdateInfoSchema}
    />
  );
};

export default UpdateAccount;

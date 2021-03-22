import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteAccount, fetchAccounts, fetchAllProfiles } from 'src/stores/actions/account';

const columnDefOfAccounts = [
  { name: 'username', title: 'Tên đăng nhập' },
  { name: 'email', title: 'Email' },
  { name: 'phone', title: 'Số điện thoại' },
  { name: 'role', title: 'Vai trò' },
  { name: 'profileId', title: 'Hồ sơ' },
];

const Account = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);
  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteAccount(rowId));
    dispatch(fetchAccounts());
    console.log('RowId Delete: ', rowId);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDefOfAccounts}
        data={accounts}
        route={ROUTE_PATH.ACCOUNT + '/'}
        idxColumnsFilter={[0]}
        linkCols={[{ name: 'profileId', route: '/profile/' }]}
      />
    </CContainer>
  );
};

export default Account;

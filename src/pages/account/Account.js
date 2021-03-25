import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchAccounts } from 'src/stores/actions/account';

const Account = ({ t, location, history }) => {
  const columnDefOfAccounts = [
    { name: 'username', title: t('label.username') },
    { name: 'email', title: t('label.email') },
    { name: 'phone', title: t('label.phone_number') },
    { name: 'role', title: t('label.role') },
    { name: 'profileId', title: t('label.profile') },
  ];
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);
  useEffect(() => {
    dispatch(fetchAccounts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const deleteRow = async (rowId) => {
  //   dispatch(deleteAccount(rowId));
  //   dispatch(fetchAccounts());
  //   console.log('RowId Delete: ', rowId);
  // };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
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

import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { deleteAccount, fetchAccounts, fetchAllProfiles } from 'src/stores/actions/account';

const columnDefOfAccounts = [
  { name: 'shortname', title: 'Mã hồ sơ' },
  { name: 'name', title: 'Tên nhân viên' },
  { name: 'positionName', title: 'Vị trí' },
  { name: 'departmentName', title: 'Phòng ban' },
  { name: 'branchName', title: 'Chi nhánh' },
  { name: 'username', title: 'Tên đăng nhập' },
  { name: 'creator', title: 'Người tạo' },
];

const columnDefOfProfiles = [
  { name: 'shortname', title: 'Mã hồ sơ' },
  { name: 'name', title: 'Tên nhân viên' },
  { name: 'phone', title: 'Số điện thoại' },
  { name: 'gender', title: 'Giới tính' },
  { name: 'email', title: 'Email' },
  { name: 'positionName', title: 'Vị trí' },
  { name: 'departmentName', title: 'Phòng ban' },
  { name: 'branchName', title: 'Chi nhánh' },
  { name: 'status', title: 'Trạng thái' },
];
const Account = () => {
  //const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);
  const profiles = useSelector((state) => state.account.profiles);
  const [isDefaultTab, setIsDefaultTab] = useState(true);
  useEffect(() => {
    // dispatch(fetchAccounts());
    // dispatch(fetchAllProfiles({isHaveAccount: false}));
  }, []);

  const handleChangeTab = (e) => {
    if ((e === 'accounts') !== isDefaultTab) {
      setIsDefaultTab(e === 'accounts');
    }
  };
  const deleteRow = async (rowId) => {
    // dispatch(deleteAccount(rowId));
    // dispatch(fetchAccounts());
    console.log('RowId Delete: ', rowId);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <CTabs activeTab="accounts" onActiveTabChange={handleChangeTab}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="accounts">Danh sách tài khoản</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="profiles">Danh sách hồ sơ chưa có tài khoản</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="accounts">
            <QTable
              columnDef={columnDefOfAccounts}
              data={accounts}
              route={'/account/'}
              idxColumnsFilter={[0]}
              deleteRow={deleteRow}
              disableCreate={true}
            />
          </CTabPane>
          <CTabPane data-tab="profiles">
            <QTable
              columnDef={columnDefOfProfiles}
              data={profiles}
              route={'account/'}
              idxColumnsFilter={[0]}
              disableDelete={true}
              disableEdit={true}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  );
};

export default Account;

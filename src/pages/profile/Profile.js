import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CContainer } from '@coreui/react';
import { deleteProfile, fetchAllProfiles } from 'src/stores/actions/account';
import QTable from 'src/components/table/Table';

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

const Profile = ({ t, location }) => {
  const profiles = useSelector((state) => state.profile.profiles);
  useEffect(() => {
    // dispatch(fetchAllProfiles());
  }, []);
  const deleteRow = async (rowId) => {
    // dispatch(deleteProfile(rowId));
    // dispatch(fetchAllProfiles());
    console.log('RowId Delete: ', rowId);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDefOfProfiles}
        data={profiles}
        route={'/profile/'}
        idxColumnsFilter={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        deleteRow={deleteRow}
      />
    </CContainer>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CContainer } from '@coreui/react';
import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';
import QTable from 'src/components/table/Table';

const columnDefOfProfiles = [
  { name: 'shortname', title: 'Mã nhân sự' },
  { name: 'fullname', title: 'Tên nhân viên' },
  { name: 'phone', title: 'Số điện thoại' },
  { name: 'gender', title: 'Giới tính' },
  { name: 'email', title: 'Email' },
  { name: 'positionId', title: 'Vị trí' },
  { name: 'departmentId', title: 'Phòng ban' },
  { name: 'branchId', title: 'Chi nhánh' },
  { name: 'status', title: 'Trạng thái' },
];

const Profile = ({ t, location }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);
  const deleteRow = async (rowId) => {
    dispatch(deleteProfile(rowId));
    dispatch(fetchProfiles());
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

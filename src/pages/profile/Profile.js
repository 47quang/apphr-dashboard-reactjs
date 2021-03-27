import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';

const Profile = ({ t, location }) => {
  const columnDefOfProfiles = [
    { name: 'shortname', title: t('label.employee_code') },
    { name: 'fullname', title: t('label.employee_full_name') },
    { name: 'phone', title: t('label.phone_number') },
    { name: 'gender', title: t('label.sex') },
    { name: 'email', title: t('label.email') },
    { name: 'positionId', title: t('label.position') },
    { name: 'departmentId', title: t('label.department') },
    { name: 'branchId', title: t('label.branch') },
    { name: 'status', title: t('label.status2') },
  ];
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  useEffect(() => {
    dispatch(fetchProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteRow = async (rowId) => {
    console.log(rowId);
    dispatch(deleteProfile(rowId));
    dispatch(fetchProfiles());
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
        columnDef={columnDefOfProfiles}
        data={profiles}
        route={ROUTE_PATH.PROFILE + '/'}
        idxColumnsFilter={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        deleteRow={deleteRow}
      />
    </CContainer>
  );
};

export default Profile;

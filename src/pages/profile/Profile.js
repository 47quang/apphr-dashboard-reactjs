import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';

const Profile = ({ t, location }) => {
  const columnDefOfProfiles = [
    { name: 'code', title: t('label.employee_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'phone', title: t('label.phone_number'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'gender', title: t('label.sex'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'email', title: t('label.email'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'positionId', title: t('label.position'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'departmentId', title: t('label.department'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'branchId', title: t('label.branch'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'status', title: t('label.status2'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  useEffect(() => {
    dispatch(fetchProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteRow = async (rowId) => {
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

import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';
import Page404 from '../page404/Page404';

const Profile = ({ t, location }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDefOfProfiles = [
    { name: 'code', title: t('label.employee_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'lastname', title: t('label.employee_last_name'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'firstname', title: t('label.employee_first_name'), align: 'left', width: '10%', wordWrapEnabled: true },
    // { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'phone', title: t('label.phone_number'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'gender', title: t('label.sex'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'email', title: t('label.email'), align: 'left', width: '20%', wordWrapEnabled: true },
    // { name: 'positionId', title: t('label.position'), align: 'left', width: '15%', wordWrapEnabled: true },
    // { name: 'departmentId', title: t('label.department'), align: 'left', width: '15%', wordWrapEnabled: true },
    // { name: 'branchId', title: t('label.branch'), align: 'left', width: '15%', wordWrapEnabled: true },
    // { name: 'status', title: t('label.status2'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
  });
  const onCurrentPageChange = (pageNumber) => {
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_PROFILE))
      dispatch(
        fetchProfiles(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  const deleteRow = async (rowId) => {
    dispatch(deleteProfile(rowId, t('message.successful_delete')));
    dispatch(fetchProfiles());
  };
  if (permissionIds.includes(PERMISSION.LIST_PROFILE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDefOfProfiles}
          data={profiles}
          route={ROUTE_PATH.PROFILE + '/'}
          idxColumnsFilter={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_PROFILE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_PROFILE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_PROFILE)}
        />
      </CContainer>
    );
  else return <Page404 />;
};

export default Profile;

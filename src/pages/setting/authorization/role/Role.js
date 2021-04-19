import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deleteRole, fetchRoles } from 'src/stores/actions/role';

const Role = ({ t, location, history }) => {
  const columnDef = [
    { name: 'code', title: t('label.role_code'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'name', title: t('label.role_name'), align: 'left', width: '60%', wordWrapEnabled: true },
  ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
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
    if (permissionIds.includes(PERMISSION.LIST_ROLE))
      dispatch(
        fetchRoles(
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
    dispatch(deleteRole(rowId, t('message.successful_delete')));
    dispatch(fetchRoles());
  };
  if (permissionIds.includes(PERMISSION.LIST_ROLE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={roles}
          route={ROUTE_PATH.ROLE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ROLE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ROLE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ROLE)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default Role;

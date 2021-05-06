import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deleteDepartment, fetchDepartments } from 'src/stores/actions/department';

const Department = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  const columnDef = [
    { name: 'code', title: t('label.department_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.department_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'branchname', title: t('label.branch'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'note', title: t('label.description'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
  });
  const onCurrentPageChange = (pageNumber) =>
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
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
    if (permissionIds.includes(PERMISSION.LIST_DEPARTMENT)) {
      dispatch(
        fetchDepartments(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = (rowId) => {
    dispatch(deleteDepartment({ id: rowId }, t('message.successful_delete')));
  };
  if (permissionIds.includes(PERMISSION.LIST_DEPARTMENT))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={departments.map((d) => {
            d.branchname = d.branch?.name;
            d.note = d.note.substr(0, 30) + '...';
            return d;
          })}
          route={ROUTE_PATH.DEPARTMENT + '/'}
          idxColumnsFilter={[0, 2]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_DEPARTMENT)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_DEPARTMENT)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_DEPARTMENT)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default Department;

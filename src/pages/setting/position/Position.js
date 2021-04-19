import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deletePosition, fetchPositions } from 'src/stores/actions/position';

const Position = ({ t, location, history }) => {
  const columnDef = [
    { name: 'code', title: t('label.position_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.position_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'branchName', title: t('label.branch'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'departmentName', title: t('label.department'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  const dispatch = useDispatch();
  const positions = useSelector((state) => state.position.positions);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
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
    if (permissionIds.includes(PERMISSION.LIST_POSITION))
      dispatch(fetchPositions({ page: paging.currentPage, perpage: paging.pageSize }, onTotalChange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = async (rowId) => {
    dispatch(deletePosition({ id: rowId }, t('message.successful_delete')));
    dispatch(fetchPositions());
  };
  if (permissionIds.includes(PERMISSION.LIST_POSITION))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          columnDef={columnDef}
          data={positions.map((p) => {
            p.branchName = p.branch?.name;
            p.departmentName = p.department?.name;
            return p;
          })}
          t={t}
          route={ROUTE_PATH.POSITION + '/'}
          idxColumnsFilter={[0, 2]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_POSITION)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_POSITION)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_POSITION)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default Position;

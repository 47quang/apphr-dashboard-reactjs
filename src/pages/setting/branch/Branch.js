import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteBranch, fetchBranches } from 'src/stores/actions/branch';
import PropTypes from 'prop-types';
const Branch = ({ t }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const columnDef = [
    { name: 'code', title: t('label.branch_code'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'name', title: t('label.branch_name'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'address', title: t('label.address'), align: 'left', width: '35%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
    loading: false,
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
      currentPage: 0,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));
  const onLoadingChange = (isLoading) =>
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  useEffect(() => {
    dispatch(
      fetchBranches(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        onLoadingChange,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = async (rowId) => {
    dispatch(deleteBranch(rowId, t('message.successful_delete')));
    dispatch(fetchBranches());
  };
  let permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
        columnDef={columnDef}
        data={branches}
        route={ROUTE_PATH.BRANCH + '/'}
        idxColumnsFilter={[0, 1]}
        deleteRow={deleteRow}
        paging={paging}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        disableDelete={!permissionIds.includes(PERMISSION.DELETE_BRANCH)}
        disableCreate={!permissionIds.includes(PERMISSION.CREATE_BRANCH)}
      />
    </CContainer>
  );
};
Branch.propTypes = {
  t: PropTypes.func,
};
export default Branch;

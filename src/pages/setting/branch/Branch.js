import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteBranch, fetchBranches } from 'src/stores/actions/branch';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';
const Branch = ({ t, history }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDef = [
    { name: 'code', title: t('label.branch_code'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'name', title: t('label.branch_name'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'address', title: t('label.address'), align: 'left', width: '35%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
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
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_BRANCH)) {
      dispatch(
        fetchBranches(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
          setLoading,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = async (rowId) => {
    dispatch(deleteBranch(rowId, t('message.successful_delete')));
    dispatch(
      fetchBranches(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_BRANCH))
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
          disableEdit={!permissionIds.includes(PERMISSION.GET_BRANCH)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
Branch.propTypes = {
  t: PropTypes.func,
};
export default Branch;

import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH, FILTER_OPERATOR } from 'src/constants/key';
import { deleteContract, fetchContractTable } from 'src/stores/actions/contract';
import { deleteWageHistory, fetchWageHistories } from 'src/stores/actions/wageHistories';
import Page404 from '../page404/Page404';

const Benefit = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDefOfAccounts = [
    { name: 'code', title: t('label._code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'contractId', title: t('label.contract'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'employee', title: t('label.employee'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'status', title: t('label.status'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const filters = {
    code: {
      title: t('label.code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    contractId: {
      title: t('label.contractId'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    employee: {
      title: t('label.employee'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    status: {
      title: t('label.status'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
  };
  const dispatch = useDispatch();
  const wageHistories = useSelector((state) => state.wageHistory.wageHistories);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    loading: false,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
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
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_USER))
      dispatch(
        fetchWageHistories(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
          setLoading,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  const filterFunction = (params) => {
    dispatch(
      fetchWageHistories(
        {
          ...params,
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteWageHistory(rowId, t('message.successful_delete')));
    dispatch(
      fetchWageHistories(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_USER))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDefOfAccounts}
          data={wageHistories}
          route={ROUTE_PATH.NAV_BENEFIT + '/'}
          deleteRow={deleteRow}
          //linkCols={[{ name: 'profileId', route: `${ROUTE_PATH.PROFILE}/` }]}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_USER)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_USER)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_USER)}
          filters={filters}
          filterFunction={filterFunction}
        />
      </CContainer>
    );
  else return <Page404 />;
};

export default Benefit;

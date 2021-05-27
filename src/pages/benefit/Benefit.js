import { CContainer } from '@coreui/react';
import { Chip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH, FILTER_OPERATOR } from 'src/constants/key';
import { COLORS } from 'src/constants/theme';
import { deleteWageHistory, fetchWageHistories } from 'src/stores/actions/wageHistories';
import Page404 from '../page404/Page404';

const Benefit = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDefOfAccounts = [
    { name: 'code', title: t('label.benefit_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'contractName', title: t('label.contract'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'employee', title: t('label.employee'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'startDate', title: t('label.start_date'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'status', title: t('label.status'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const filters = {
    code: {
      title: t('label.benefit_code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    contractCode: {
      title: t('label.contract_code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    profileCode: {
      title: t('label.employee_code'),
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
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        {
          id: 'active',
          name: t('label.active'),
        },
        {
          id: 'inactive',
          name: t('label.inactive'),
        },
      ],
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
          t,
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
        t,
      ),
    );
  };
  const handleAfterDelete = () => {
    dispatch(
      fetchWageHistories(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
        t,
      ),
    );
  };
  const deleteRow = (rowId) => {
    dispatch(deleteWageHistory(rowId, handleAfterDelete, t('message.successful_delete')));
  };
  const statusComponent = (value, colName) => {
    return (
      <Chip
        label={value === 'active' ? t('label.active') : t('label.inactive')}
        className="m-0 p-0"
        style={{
          backgroundColor: value === 'active' ? COLORS.FULLY_ROLL_CALL : COLORS.FULLY_ABSENT_ROLL_CALL,
        }}
      />
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
          linkCols={[
            { name: 'contractName', id: 'contractId', route: `${ROUTE_PATH.NAV_CONTRACT}/` },
            { name: 'employee', id: 'profileId', route: `${ROUTE_PATH.PROFILE}/` },
          ]}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          statusCols={['status']}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_USER)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_USER)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_USER)}
          filters={filters}
          filterFunction={filterFunction}
          fixed={true}
          statusComponent={statusComponent}
        />
      </CContainer>
    );
  else return <Page404 />;
};

export default Benefit;

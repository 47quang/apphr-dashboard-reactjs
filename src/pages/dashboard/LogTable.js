import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteAllowance, fetchAllowances, setEmptyAllowances } from 'src/stores/actions/allowance';
import Page404 from 'src/pages/page404/Page404';
import { Chip } from '@material-ui/core';
import { COLORS } from 'src/constants/theme';

const LogTable = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const logData = useSelector((state) => state.log.data);
  const columnDef = [
    { name: 'user', title: t('label.log_user'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'message', title: t('label.log_message'), align: 'left', width: '50%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];

  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
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
    if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
      dispatch(
        fetchAllowances(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
          setLoading,
        ),
      );
    return () => {
      dispatch(setEmptyAllowances());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const filterFunction = (params) => {
    dispatch(
      fetchAllowances(
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
  const handleAfterDelete = () => {
    dispatch(
      fetchAllowances(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteAllowance(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  const statusComponent = (value, colName) => {
    return (
      <Chip
        label={value === 'tax' ? t('label.tax') : value === 'no_tax' ? t('label.no_tax') : t('label.partial_tax')}
        className="m-0 p-0"
        style={{
          backgroundColor: value === 'tax' ? COLORS.FULLY_ROLL_CALL : value === 'no_tax' ? COLORS.FULLY_ABSENT_ROLL_CALL : COLORS.BLUE,
        }}
      />
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={allowances}
          route={ROUTE_PATH.ALLOWANCE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ALLOWANCE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ALLOWANCE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ALLOWANCE)}
          filters={filters}
          filterFunction={filterFunction}
          statusComponent={statusComponent}
          statusCols={['type']}
        />
      </CContainer>
    );
  else return <Page404 />;
};

export default LogTable;

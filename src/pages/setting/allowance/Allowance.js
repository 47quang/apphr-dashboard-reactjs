import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteAllowance, fetchAllowances, setEmptyAllowances } from 'src/stores/actions/allowance';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';
import { Chip } from '@material-ui/core';
import { COLORS } from 'src/constants/theme';
import { Helmet } from 'react-helmet';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const Allowance = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const allowances = useSelector((state) => state.allowance.allowances);
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.allowance_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.allowance_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'type', title: t('label.allowance_type'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.allowance_amount'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
  ]);
  const operatesText = [
    {
      id: FILTER_OPERATOR.LIKE,
      name: t('filter_operator.like'),
    },
    {
      id: FILTER_OPERATOR.START,
      name: t('filter_operator.start'),
    },
    {
      id: FILTER_OPERATOR.END,
      name: t('filter_operator.end'),
    },
    {
      id: FILTER_OPERATOR.EMPTY,
      name: t('filter_operator.empty'),
    },
    {
      id: FILTER_OPERATOR.NOT_EMPTY,
      name: t('filter_operator.not_empty'),
    },
  ];
  const filters = {
    code: {
      title: t('label.allowance_code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.allowance_name'),
      operates: operatesText,
      type: 'text',
    },
    type: {
      title: t('label.allowance_type'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        { id: 'tax', name: t('label.tax') },
        { id: 'no_tax', name: t('label.no_tax') },
        { id: 'partial_tax', name: t('label.partial_tax') },
      ],
    },
  };
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
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

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    setColumnDef([
      { name: 'code', title: t('label.allowance_code'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'name', title: t('label.allowance_name'), align: 'left', width: '25%', wordWrapEnabled: true },
      { name: 'type', title: t('label.allowance_type'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'amount', title: t('label.allowance_amount'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
      dispatch(
        fetchAllowances(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          setLoading,
        ),
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  useEffect(() => {
    return () => {
      dispatch(setEmptyAllowances());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterFunction = (params) => {
    dispatch(
      fetchAllowances(
        {
          ...params,
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
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
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Allowance')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={allowances?.payload ?? []}
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
          total={allowances?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
Allowance.propTypes = {
  t: PropTypes.func,
};
export default Allowance;

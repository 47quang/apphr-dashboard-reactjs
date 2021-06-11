import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteWage, fetchWages, setEmptyWages } from 'src/stores/actions/wage';
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

const Wage = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const wages = useSelector((state) => state.wage.wages);
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.wage_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.wage_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'type', title: t('label.payment_method'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.wage_amount'), align: 'left', width: '15%', wordWrapEnabled: true },
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
      title: t('label.wage_code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.wage_name'),
      operates: operatesText,
      type: 'text',
    },
    type: {
      title: t('label.payment_method'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        { id: 'by_hour', name: t('label.by_hour') },
        { id: 'by_month', name: t('label.by_month') },
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
      { name: 'code', title: t('label.wage_code'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'name', title: t('label.wage_name'), align: 'left', width: '25%', wordWrapEnabled: true },
      { name: 'type', title: t('label.payment_method'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'amount', title: t('label.wage_amount'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_WAGE))
      dispatch(
        fetchWages(
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
      dispatch(setEmptyWages());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchWages(
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
      fetchWages(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteWage(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  const statusComponent = (value, colName) => {
    return (
      <Chip
        label={value === 'by_hour' ? t('label.by_hour') : t('label.by_month')}
        className="m-0 p-0"
        style={{
          backgroundColor: value === 'by_hour' ? COLORS.FULLY_ROLL_CALL : COLORS.FULLY_ABSENT_ROLL_CALL,
        }}
      />
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_WAGE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Setting')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={wages?.payload ?? []}
          route={ROUTE_PATH.WAGE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_WAGE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_WAGE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_WAGE)}
          filters={filters}
          filterFunction={filterFunction}
          statusComponent={statusComponent}
          statusCols={['type']}
          total={wages?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
Wage.propTypes = {
  t: PropTypes.func,
};
export default Wage;

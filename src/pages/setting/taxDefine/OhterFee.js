import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';
import { deletePayment, fetchPayments, setEmptyPayments } from 'src/stores/actions/payment';
import { Chip } from '@material-ui/core';
import { COLORS } from 'src/constants/theme';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const OtherFee = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.payment_name'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'type', title: t('label.payment_type'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
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
      title: t('label.code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.payment_name'),
      operates: operatesText,
      type: 'text',
    },
    type: {
      title: t('label.payment_type'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        { id: 'value', name: t('label.payment_value') },
        { id: 'percent', name: t('label.percent') },
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
      { name: 'code', title: t('label.code'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'name', title: t('label.payment_name'), align: 'left', width: '30%', wordWrapEnabled: true },
      { name: 'type', title: t('label.payment_type'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_WAGE))
      dispatch(
        fetchPayments(
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
      dispatch(setEmptyPayments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchPayments(
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
      fetchPayments(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deletePayment(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  const statusComponent = (value, colName) => {
    return (
      <Chip
        label={value === 'value' ? t('label.payment_value') : t('label.percent')}
        className="m-0 p-0"
        style={{
          backgroundColor: value === 'value' ? COLORS.FULLY_ROLL_CALL : COLORS.FULLY_ABSENT_ROLL_CALL,
        }}
      />
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_WAGE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={payments?.payload ?? []}
          route={ROUTE_PATH.TAX_DETAIL + '/'}
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
          total={payments?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
OtherFee.propTypes = {
  t: PropTypes.func,
};
export default OtherFee;

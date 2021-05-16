import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteAllowance, fetchAllowances, setEmptyAllowances } from 'src/stores/actions/allowance';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';

const Allowance = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const allowances = useSelector((state) => state.allowance.allowances);
  const columnDef = [
    { name: 'code', title: t('label.allowance_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'type', title: t('label.allowance_type'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.allowance_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.allowance_amount'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const filters = {
    code: {
      title: t('label.allowance_code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    name: {
      title: t('label.allowance_name'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
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
  const decreaseTotal = (decrease) =>
    setPaging((prevState) => ({
      ...prevState,
      total: prevState.total - decrease,
    }));
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

  const deleteRow = async (rowId) => {
    dispatch(deleteAllowance(rowId, decreaseTotal, t('message.successful_delete')));
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
        />
      </CContainer>
    );
  else return <Page404 />;
};
Allowance.propTypes = {
  t: PropTypes.func,
};
export default Allowance;

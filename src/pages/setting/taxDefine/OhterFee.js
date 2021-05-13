import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';
import { deletePayment, fetchPayments } from 'src/stores/actions/payment';

const OtherFee = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);
  const columnDef = [
    { name: 'id', title: t('label.id'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.payment_name'), align: 'left', width: '35%', wordWrapEnabled: true },
    { name: 'type', title: t('label.payment_type'), align: 'left', width: '30%', wordWrapEnabled: true },
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
    if (permissionIds.includes(PERMISSION.LIST_WAGE))
      dispatch(
        fetchPayments(
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

  const deleteRow = async (rowId) => {
    dispatch(deletePayment(rowId, t('message.successful_delete')));
    dispatch(
      fetchPayments(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_WAGE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={payments}
          route={ROUTE_PATH.TAX_DETAIL + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_WAGE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_WAGE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_WAGE)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
OtherFee.propTypes = {
  t: PropTypes.func,
};
export default OtherFee;

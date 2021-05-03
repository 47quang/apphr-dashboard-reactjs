import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteWage, fetchWages } from 'src/stores/actions/wage';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';
import { fetchPayments } from 'src/stores/actions/payment';

const OtherFee = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);
  const columnDef = [
    { name: 'type', title: t('label.payment_type'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'by', title: t('label.wage_name'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'value', title: t('label.payment_value'), align: 'left', width: '20%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
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
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_WAGE))
      dispatch(
        fetchPayments(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = async (rowId) => {
    dispatch(deleteWage(rowId, t('message.successful_delete')));
    dispatch(fetchWages());
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

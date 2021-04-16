import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteAllowance, fetchAllowances } from 'src/stores/actions/allowance';
import PropTypes from 'prop-types';
const Allowance = ({ t }) => {
  const dispatch = useDispatch();
  const allowances = useSelector((state) => state.allowance.allowances);
  const columnDef = [
    { name: 'code', title: t('label.allowance_code'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'name', title: t('label.allowance_name'), align: 'left', width: '40%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.allowance_amount'), align: 'left', width: '25%', wordWrapEnabled: true },
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
    dispatch(
      fetchAllowances(
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
    dispatch(deleteAllowance(rowId, t('message.successful_delete')));
    dispatch(fetchAllowances());
  };

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
      />
    </CContainer>
  );
};
Allowance.propTypes = {
  t: PropTypes.func,
};
export default Allowance;

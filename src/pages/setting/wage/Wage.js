import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteWage, fetchWages } from 'src/stores/actions/wage';
import PropTypes from 'prop-types';
const Wage = ({ t }) => {
  const dispatch = useDispatch();
  const wages = useSelector((state) => state.wage.wages);
  const columnDef = [
    { name: 'code', title: t('label.wage_code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'type', title: t('label.payment_method'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.wage_name'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.wage_amount'), align: 'left', width: '20%', wordWrapEnabled: true },
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
      fetchWages(
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

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
        columnDef={columnDef}
        data={wages}
        route={ROUTE_PATH.WAGE + '/'}
        idxColumnsFilter={[0, 1]}
        deleteRow={deleteRow}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        paging={paging}
      />
    </CContainer>
  );
};
Wage.propTypes = {
  t: PropTypes.func,
};
export default Wage;

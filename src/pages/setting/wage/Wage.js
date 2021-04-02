import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteWage, fetchWages } from 'src/stores/actions/wage';
import PropTypes from 'prop-types';
const Wage = ({ t }) => {
  const dispatch = useDispatch();
  const wages = useSelector((state) => state.wage.wages);
  const columnDef = [
    { name: 'code', title: t('label.wage_code') },
    { name: 'type', title: t('label.payment_method') },
    { name: 'name', title: t('label.wage_name') },
    { name: 'amount', title: t('label.wage_amount') },
    { name: 'dayOff', title: t('label.wage_dayOff') },
  ];
  useEffect(() => {
    dispatch(fetchWages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteWage(rowId, t('message.successful_delete')));
    dispatch(fetchWages());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={wages} route={ROUTE_PATH.WAGE + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
Wage.propTypes = {
  t: PropTypes.func,
};
export default Wage;

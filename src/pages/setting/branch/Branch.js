import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteBranch, fetchBranches } from 'src/stores/actions/branch';
import PropTypes from 'prop-types';
const Branch = ({ t }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const columnDef = [
    { name: 'shortname', title: t('label.branch_code') },
    { name: 'name', title: t('label.branch_name') },
    { name: 'address', title: t('label.address') },
  ];
  useEffect(() => {
    dispatch(fetchBranches());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteBranch(rowId, t('message.successful_delete')));
    dispatch(fetchBranches());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={branches} route={ROUTE_PATH.BRANCH + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
Branch.propTypes = {
  t: PropTypes.func,
};
export default Branch;

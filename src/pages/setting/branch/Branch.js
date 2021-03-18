import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { deleteBranch, fetchBranches } from 'src/stores/actions/branch';

const columnDef = [
  { name: 'shortname', title: 'Mã chi nhánh' },
  { name: 'name', title: 'Tên chi nhánh' },
  { name: 'address', title: 'Địa chỉ' },
];
const Branch = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteBranch(rowId));
    dispatch(fetchBranches());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable columnDef={columnDef} data={branches} route={'/setting/branch/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
export default Branch;

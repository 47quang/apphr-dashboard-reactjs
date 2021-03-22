import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteRole, fetchRoles } from 'src/stores/actions/role';

const columnDef = [
  { name: 'id', title: 'Mã vai trò' },
  { name: 'name', title: 'Tên vai trò' },
];
const Role = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteRole(rowId));
    dispatch(fetchRoles());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable columnDef={columnDef} data={roles} route={ROUTE_PATH.ROLE + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
export default Role;

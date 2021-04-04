import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteRole, fetchRoles } from 'src/stores/actions/role';

const Role = ({ t, location, history }) => {
  const columnDef = [
    { name: 'code', title: t('label.role_code'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'name', title: t('label.role_name'), align: 'left', width: '60%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);

  useEffect(() => {
    dispatch(fetchRoles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteRole(rowId, t('message.successful_delete')));
    dispatch(fetchRoles());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={roles} route={ROUTE_PATH.ROLE + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
export default Role;

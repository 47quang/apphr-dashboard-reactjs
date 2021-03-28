import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';

const Contract = ({ t, isCreate }) => {
  const columnDef = [
    { name: 'id', title: t('label.ordinal') },
    { name: 'name', title: t('label.full_name') },
    { name: 'code', title: t('label.contract_code') },
    { name: 'type', title: t('label.contract_type') },
    { name: 'signDate', title: t('label.signature_date') },
    { name: 'expirationDate', title: t('label.expiration_date') },
    { name: 'status', title: t('label.status') },
  ];
  const contracts = useSelector((state) => state.profile.contracts);
  useEffect(() => {
    // dispatch(fetchAllContract());
  }, []);
  const deleteRow = async (rowId) => {
    // dispatch(deleteProfile(rowId));
    // dispatch(fetchAllProfiles());
    console.log('RowId Delete: ', rowId);
  };
  if (isCreate) {
    return (
      <QTable
        t={t}
        columnDef={columnDef}
        data={contracts}
        route={ROUTE_PATH.CONTRACT + '/'}
        idxColumnsFilter={[0, 2, 6]}
        deleteRow={deleteRow}
        dateCols={[4, 5]}
      />
    );
  } else {
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable t={t} columnDef={columnDef} data={contracts} route={ROUTE_PATH.CONTRACT + '/'} idxColumnsFilter={[0, 1, 2]} deleteRow={deleteRow} />;
      </CContainer>
    );
  }
};

export default Contract;

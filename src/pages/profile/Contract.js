import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';

const columnDef = [
  { name: 'id', title: 'Số thứ tự' },
  { name: 'name', title: 'Họ và tên' },
  { name: 'code', title: 'Số hợp đồng' },
  { name: 'type', title: 'Loại hợp đồng' },
  { name: 'signDate', title: 'Ngày ký' },
  { name: 'expirationDate', title: 'Ngày hết hạn' },
  { name: 'status', title: 'Tình trạng' },
];
const Contract = ({ isCreate }) => {
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
        <QTable columnDef={columnDef} data={contracts} route={ROUTE_PATH.CONTRACT + '/'} idxColumnsFilter={[0, 1, 2]} deleteRow={deleteRow} />;
      </CContainer>
    );
  }
};

export default Contract;

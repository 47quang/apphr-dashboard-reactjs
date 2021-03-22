import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';

const columnDef = [
  { name: 'id', title: 'Số thứ tự' },
  { name: 'name', title: 'Họ và tên' },
  { name: 'branch', title: 'Chi nhánh' },
  { name: 'department', title: 'Phòng ban' },
  { name: 'position', title: 'Vị trí' },
  { name: 'role', title: 'Vai trò' },
  { name: 'start', title: 'Ngày bắt đầu' },
  { name: 'end', title: 'Ngày kết thúc' },
  { name: 'countDay', title: 'Thời gian làm việc' },
];
const HistoryWorking = ({ isCreate }) => {
  const history = useSelector((state) => state.profile.historyWorking);
  useEffect(() => {
    // dispatch(fetchAllContract());
  }, []);
  const deleteRow = async (rowId) => {
    // dispatch(deleteProfile(rowId));
    // dispatch(fetchAllProfiles());
    console.log('RowId Delete: ', rowId);
  };
  if (isCreate) {
  } else {
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          columnDef={columnDef}
          data={history}
          route={'/profile/historyWorking/'}
          idxColumnsFilter={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          deleteRow={deleteRow}
          dateCols={[6, 7]}
        />
      </CContainer>
    );
  }
};

export default HistoryWorking;

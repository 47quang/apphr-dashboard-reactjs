import { CContainer } from '@coreui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';

const HistoryWorking = ({ t, isCreate }) => {
  const history = useSelector((state) => state.profile.historyWorking);
  const columnDef = [
    { name: 'id', title: t('label.ordinal') },
    { name: 'name', title: t('label.full_name') },
    { name: 'branch', title: t('label.branch') },
    { name: 'department', title: t('label.department') },
    { name: 'position', title: t('label.position') },
    { name: 'role', title: t('label.role') },
    { name: 'start', title: t('label.start_date') },
    { name: 'end', title: t('label.end_date') },
    { name: 'countDay', title: t('label.time_on_site') },
  ];
  const deleteRow = async (rowId) => {
    // dispatch(deleteProfile(rowId));
    // dispatch(fetchAllProfiles());
  };
  // if (isCreate) {
  // } else {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
        columnDef={columnDef}
        data={history}
        route={'/profile/historyWorking/'}
        idxColumnsFilter={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        deleteRow={deleteRow}
        dateCols={[6, 7]}
      />
    </CContainer>
  );
  // }
};

export default HistoryWorking;

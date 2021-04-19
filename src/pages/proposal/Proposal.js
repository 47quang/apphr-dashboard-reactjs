import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';

// import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';

const Proposal = ({ t, location, match }) => {
  const columnDefOfProfiles = [
    { name: 'code', title: t('label.proposal_code'), align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '15%', wordWrapEnabled: true },
    // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'shifts', title: t('label.shifts'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'sentDate', title: t('label.sent_date'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'status', title: t('label.status'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'handler', title: t('label.handler'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  // const dispatch = useDispatch();
  // const proposals = useSelector((state) => state.proposal.proposals);
  const proposals = [
    {
      id: 1,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      shifts: [
        { id: 1, shift: 'CS1 - Ca sáng 1 - 08:30 - 11:30 - 15/11/2020' },
        { id: 2, shift: 'CC1 - Ca chiều 1 - 13:30 - 17:30 - 15/11/2020' },
      ],
      sentDate: '2020-11-15',
      status: 'accept',
      handler: 'Nguyễn Văn Minh',
    },
    {
      id: 2,
      code: 'NV002',
      fullname: 'Nguyễn Văn Anh',
      shifts: [{ id: 1, shift: 'CS1 - Ca sáng 1 - 15/11/2020' }],
      sentDate: '2020-11-15',
      status: 'pending',
      handler: 'Nguyễn Văn Minh',
    },
    {
      id: 3,
      code: 'NV003',
      fullname: 'Nguyễn Văn Ánh',
      type: 'Tăng ca',
      shifts: [{ id: 3, shift: 'CT1 - Ca tối 1 - 15/11/2020' }],
      sentDate: '2020-11-15',
      status: 'deny',
      handler: 'Nguyễn Văn Minh',
    },
  ];
  useEffect(() => {
    //dispatch(fetchProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const deleteRow = async (rowId) => {
  //   dispatch(deleteProfile(rowId, t('message.successful_delete')));
  //   dispatch(fetchProfiles());
  // };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
        columnDef={columnDefOfProfiles}
        data={proposals}
        route={ROUTE_PATH.PROPOSAL + '/'}
        idxColumnsFilter={[0, 1, 3, 4]}
        disableEditColum={true}
        dateCols={[3]}
        multiValuesCols={[2]}
        statusCols={[4]}
      />
    </CContainer>
  );
};

export default Proposal;

import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES } from 'src/constants/key';
import {
  fetchLeaveRequests,
  fetchRemoteRequests,
  fetchOvertimeRequests,
  setEmptyLeaveRequests,
  setEmptyRemoteRequests,
  setEmptyOverTimeRequests,
} from 'src/stores/actions/request';

// import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';

const Proposal = ({ t, location, match, type, profileId }) => {
  if (!type) type = match.path.split('/')[2];
  const columnDefOfProfiles =
    type === 'leave'
      ? [
          { name: 'id', title: t('label.id'), align: 'left', width: '15%', wordWrapEnabled: true },
          { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '20%', wordWrapEnabled: true },
          // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'type', title: t('label.leave_form_type'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'createdAt', title: t('label.sent_date'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'status', title: t('label.status'), align: 'left', width: '20%', wordWrapEnabled: true },
          // { name: 'handler', title: t('label.handler'), align: 'left', width: '15%', wordWrapEnabled: true },
        ]
      : [
          { name: 'id', title: t('label.id'), align: 'left', width: '15%', wordWrapEnabled: true },
          { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '30%', wordWrapEnabled: true },
          // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'createdAt', title: t('label.sent_date'), align: 'left', width: '25%', wordWrapEnabled: true },
          { name: 'status', title: t('label.status'), align: 'left', width: '25%', wordWrapEnabled: true },
          // { name: 'handler', title: t('label.handler'), align: 'left', width: '20%', wordWrapEnabled: true },
        ];
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state.request[type + 'Requests']);
  // const proposals = [
  //   {
  //     id: 1,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     shifts: [
  //       { id: 1, shift: 'CS1 - Ca sáng 1 - 08:30 - 11:30 - 15/11/2020' },
  //       { id: 2, shift: 'CC1 - Ca chiều 1 - 13:30 - 17:30 - 15/11/2020' },
  //     ],
  //     sentDate: '2020-11-15',
  //     status: 'accept',
  //     handler: 'Nguyễn Văn Minh',
  //   },
  //   {
  //     id: 2,
  //     code: 'NV002',
  //     fullname: 'Nguyễn Văn Anh',
  //     shifts: [{ id: 1, shift: 'CS1 - Ca sáng 1 - 15/11/2020' }],
  //     sentDate: '2020-11-15',
  //     status: 'pending',
  //     handler: 'Nguyễn Văn Minh',
  //   },
  //   {
  //     id: 3,
  //     code: 'NV003',
  //     fullname: 'Nguyễn Văn Ánh',
  //     type: 'Tăng ca',
  //     shifts: [{ id: 3, shift: 'CT1 - Ca tối 1 - 15/11/2020' }],
  //     sentDate: '2020-11-15',
  //     status: 'deny',
  //     handler: 'Nguyễn Văn Minh',
  //   },
  // ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,

    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],

    loading: false,
  });
  const onCurrentPageChange = (pageNumber) =>
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
      currentPage: 0,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));

  useEffect(() => {
    if (type === 'leave')
      profileId
        ? dispatch(
            fetchLeaveRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              onTotalChange,
            ),
          )
        : dispatch(
            fetchLeaveRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              onTotalChange,
            ),
          );
    else if (type === 'remote')
      profileId
        ? dispatch(
            fetchRemoteRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              onTotalChange,
            ),
          )
        : dispatch(
            fetchRemoteRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              onTotalChange,
            ),
          );
    else
      profileId
        ? dispatch(
            fetchOvertimeRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              onTotalChange,
            ),
          )
        : dispatch(
            fetchOvertimeRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              onTotalChange,
            ),
          );
    return () => {
      if (type === 'leave') dispatch(setEmptyLeaveRequests());
      else if (type === 'remote') dispatch(setEmptyRemoteRequests());
      else dispatch(setEmptyOverTimeRequests());
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  // const deleteRow = async (rowId) => {
  //   dispatch(deleteProfile(rowId, t('message.successful_delete')));
  //   dispatch(fetchProfiles());
  // };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {type === 'leave' ? (
        <QTable
          t={t}
          columnDef={columnDefOfProfiles}
          data={proposals}
          route={match.url + '/' + type + '.id='}
          idxColumnsFilter={[0, 1, 4]}
          disableDelete={true}
          // disableCreate={true}
          statusCols={[4]}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      ) : (
        <QTable
          t={t}
          columnDef={columnDefOfProfiles}
          data={proposals}
          route={match.url + '/' + type + '.id='}
          idxColumnsFilter={[0, 1, 3]}
          disableDelete={true}
          // disableCreate={true}
          statusCols={[3]}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </CContainer>
  );
};

export default Proposal;

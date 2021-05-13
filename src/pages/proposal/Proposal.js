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
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
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
              setLoading,
            ),
          )
        : dispatch(
            fetchLeaveRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              onTotalChange,
              setLoading,
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
              setLoading,
            ),
          )
        : dispatch(
            fetchRemoteRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              onTotalChange,
              setLoading,
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
              setLoading,
            ),
          )
        : dispatch(
            fetchOvertimeRequests(
              {
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              onTotalChange,
              setLoading,
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

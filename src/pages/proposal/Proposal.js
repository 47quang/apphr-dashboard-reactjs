import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, ROUTE_PATH } from 'src/constants/key';
import {
  fetchLeaveRequests,
  fetchRemoteRequests,
  fetchOvertimeRequests,
  setEmptyLeaveRequests,
  setEmptyRemoteRequests,
  setEmptyOverTimeRequests,
  filterLeaveRequests,
  filterOvertimeRequests,
  filterRemoteRequests,
} from 'src/stores/actions/request';
import Chip from '@material-ui/core/Chip';
import { COLORS } from 'src/constants/theme';
import { Helmet } from 'react-helmet';

// import { deleteProfile, fetchProfiles } from 'src/stores/actions/profile';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const Proposal = ({ t, location, match, type, profileId, ...restProps }) => {
  let filterObject = location?.state ?? {};
  if (!type) type = match.path.split('/')[1];
  const [columnDef, setColumnDef] = useState(
    type === 'leave'
      ? [
          { name: 'code', title: t('label.code'), align: 'left', width: '15%', wordWrapEnabled: true },
          { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '20%', wordWrapEnabled: true },
          // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'type', title: t('label.leave_form_type'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'createdAt', title: t('label.sent_date'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'status', title: t('label.status'), align: 'left', width: '15%', wordWrapEnabled: true },
          // { name: 'handler', title: t('label.handler'), align: 'left', width: '15%', wordWrapEnabled: true },
        ]
      : [
          { name: 'code', title: t('label.code'), align: 'left', width: '15%', wordWrapEnabled: true },
          { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '30%', wordWrapEnabled: true },
          // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
          { name: 'createdAt', title: t('label.sent_date'), align: 'left', width: '25%', wordWrapEnabled: true },
          { name: 'status', title: t('label.status'), align: 'left', width: '20%', wordWrapEnabled: true },
          // { name: 'handler', title: t('label.handler'), align: 'left', width: '20%', wordWrapEnabled: true },
        ],
  );
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state.request[type + 'Requests']);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
  });
  const operatesText = [
    {
      id: FILTER_OPERATOR.LIKE,
      name: t('filter_operator.like'),
    },
    {
      id: FILTER_OPERATOR.START,
      name: t('filter_operator.start'),
    },
    {
      id: FILTER_OPERATOR.END,
      name: t('filter_operator.end'),
    },
    {
      id: FILTER_OPERATOR.EMPTY,
      name: t('filter_operator.empty'),
    },
    {
      id: FILTER_OPERATOR.NOT_EMPTY,
      name: t('filter_operator.not_empty'),
    },
  ];
  const filters =
    type === 'leave'
      ? {
          code: {
            title: t('label.code'),
            operates: operatesText,
            type: 'text',
          },
          type: {
            title: t('label.leave_form_type'),
            operates: [
              {
                id: FILTER_OPERATOR.EQUAL,
                name: t('filter_operator.='),
              },
            ],
            type: 'select',
            values: [
              {
                id: 'pay',
                name: t('label.pay'),
              },
              {
                id: 'no-pay',
                name: t('label.no-pay'),
              },
              {
                id: 'policy',
                name: t('label.policy'),
              },
            ],
          },
          status: {
            title: t('label.status'),
            operates: [
              {
                id: FILTER_OPERATOR.EQUAL,
                name: t('filter_operator.='),
              },
            ],
            type: 'select',
            values: [
              {
                id: 'approve',
                name: t('label.approve'),
              },
              {
                id: 'reject',
                name: t('label.reject'),
              },
              {
                id: 'new',
                name: t('label.new'),
              },
            ],
          },
        }
      : {
          code: {
            title: t('label.code'),
            operates: operatesText,
            type: 'text',
          },
          status: {
            title: t('label.status'),
            operates: [
              {
                id: FILTER_OPERATOR.EQUAL,
                name: t('filter_operator.='),
              },
            ],
            type: 'select',
            values: [
              {
                id: 'approve',
                name: t('label.approve'),
              },
              {
                id: 'reject',
                name: t('label.reject'),
              },
              {
                id: 'new',
                name: t('label.new'),
              },
            ],
          },
        };
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

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    setColumnDef(
      type === 'leave'
        ? [
            { name: 'code', title: t('label.code'), align: 'left', width: '15%', wordWrapEnabled: true },
            { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '20%', wordWrapEnabled: true },
            // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
            { name: 'type', title: t('label.leave_form_type'), align: 'left', width: '20%', wordWrapEnabled: true },
            { name: 'createdAt', title: t('label.sent_date'), align: 'left', width: '20%', wordWrapEnabled: true },
            { name: 'status', title: t('label.status'), align: 'left', width: '15%', wordWrapEnabled: true },
            // { name: 'handler', title: t('label.handler'), align: 'left', width: '15%', wordWrapEnabled: true },
          ]
        : [
            { name: 'code', title: t('label.code'), align: 'left', width: '15%', wordWrapEnabled: true },
            { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '30%', wordWrapEnabled: true },
            // { name: 'description', title: t('label.description'), align: 'left', width: '20%', wordWrapEnabled: true },
            { name: 'createdAt', title: t('label.sent_date'), align: 'left', width: '25%', wordWrapEnabled: true },
            { name: 'status', title: t('label.status'), align: 'left', width: '20%', wordWrapEnabled: true },
            // { name: 'handler', title: t('label.handler'), align: 'left', width: '20%', wordWrapEnabled: true },
          ],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);
  useEffect(() => {
    if (type === 'leave')
      profileId
        ? dispatch(
            fetchLeaveRequests(
              {
                filters: [filterObject],
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              setLoading,
            ),
          )
        : dispatch(
            fetchLeaveRequests(
              {
                filters: [filterObject],
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              setLoading,
            ),
          );
    else if (type === 'remote')
      profileId
        ? dispatch(
            fetchRemoteRequests(
              {
                filters: [filterObject],
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              setLoading,
            ),
          )
        : dispatch(
            fetchRemoteRequests(
              {
                filters: [filterObject],
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              setLoading,
            ),
          );
    else
      profileId
        ? dispatch(
            fetchOvertimeRequests(
              {
                filters: [filterObject],
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              setLoading,
            ),
          )
        : dispatch(
            fetchOvertimeRequests(
              {
                filters: [filterObject],
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              setLoading,
            ),
          );

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  useEffect(() => {
    return () => {
      if (type === 'leave') dispatch(setEmptyLeaveRequests());
      else if (type === 'remote') dispatch(setEmptyRemoteRequests());
      else dispatch(setEmptyOverTimeRequests());
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterFunction = (params) => {
    if (type === 'leave')
      profileId
        ? dispatch(
            filterLeaveRequests(
              {
                ...params,
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              setLoading,
            ),
          )
        : dispatch(
            filterLeaveRequests(
              {
                ...params,
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              setLoading,
            ),
          );
    else if (type === 'remote')
      profileId
        ? dispatch(
            filterRemoteRequests(
              {
                ...params,
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              setLoading,
            ),
          )
        : dispatch(
            filterRemoteRequests(
              {
                ...params,
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              setLoading,
            ),
          );
    else
      profileId
        ? dispatch(
            filterOvertimeRequests(
              {
                ...params,
                page: paging.currentPage,
                perpage: paging.pageSize,
                profileId: profileId,
              },
              setLoading,
            ),
          )
        : dispatch(
            filterOvertimeRequests(
              {
                ...params,
                page: paging.currentPage,
                perpage: paging.pageSize,
              },
              setLoading,
            ),
          );
  };
  const statusComponent = (value, colName) => {
    if (colName === 'type')
      return (
        <Chip
          label={value === 'pay' ? t('label.pay') : value === 'no-pay' ? t('label.no-pay') : t('label.policy')}
          className="m-0 p-0"
          style={{
            backgroundColor: value === 'pay' ? COLORS.FULLY_ROLL_CALL : value === 'no-pay' ? COLORS.FULLY_ABSENT_ROLL_CALL : COLORS.BLUE,
          }}
        />
      );
    else
      return (
        <Chip
          label={value === 'approve' ? t('label.approve') : value === 'reject' ? t('label.reject') : t('label.new')}
          className="m-0 p-0"
          style={{
            backgroundColor: value === 'approve' ? COLORS.FULLY_ROLL_CALL : value === 'reject' ? COLORS.FULLY_ABSENT_ROLL_CALL : COLORS.BLUE,
          }}
        />
      );
  };
  return (
    <CContainer fluid className="c-main m-auto p-4" style={{ backgroundColor: '#f7f7f7' }}>
      <Helmet>
        <title>{'APPHR | ' + t('Proposal')}</title>
        <link rel="shortcut icon" href={'images/short_logo.png'} type="image/png" />
      </Helmet>
      {type === 'leave' ? (
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={proposals?.payload ?? []}
          route={ROUTE_PATH.LEAVE + '/'}
          // disableDelete={true}
          disableToolBar={profileId ? true : false}
          statusCols={['type', 'status']}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          filters={filters}
          filterFunction={filterFunction}
          statusComponent={statusComponent}
          fixed={true}
          total={proposals?.total ?? 0}
          filterValues={{
            ...filterObject,
            operates: [
              {
                id: FILTER_OPERATOR.EQUAL,
                name: t('filter_operator.='),
              },
            ],
          }}
        />
      ) : (
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={proposals?.payload ?? []}
          route={(type === 'remote' ? ROUTE_PATH.REMOTE : ROUTE_PATH.OVERTIME) + '/'}
          idxColumnsFilter={[0, 1, 3]}
          disableDelete={true}
          disableToolBar={profileId ? true : false}
          statusCols={['status']}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          filters={filters}
          filterFunction={filterFunction}
          statusComponent={statusComponent}
          fixed={true}
          total={proposals?.total ?? 0}
          filterValues={{
            ...filterObject,
            operates: [
              {
                id: FILTER_OPERATOR.EQUAL,
                name: t('filter_operator.='),
              },
            ],
          }}
        />
      )}
    </CContainer>
  );
};

export default Proposal;

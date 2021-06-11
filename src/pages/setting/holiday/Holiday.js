import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deleteHoliday, fetchHolidays, setEmptyHolidays } from 'src/stores/actions/holiday';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const HolidayPage = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.holiday_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'title', title: t('label.holiday_title'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'startDate', title: t('label.start_date'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'endDate', title: t('label.end_date'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
  ]);
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
  const filters = {
    code: {
      title: t('label.holiday_code'),
      operates: operatesText,
      type: 'text',
    },
    title: {
      title: t('label.holiday_title'),
      operates: operatesText,
      type: 'text',
    },
  };
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holiday.holidays);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
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
    }));

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    setColumnDef([
      { name: 'code', title: t('label.holiday_code'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'title', title: t('label.holiday_title'), align: 'left', width: '30%', wordWrapEnabled: true },
      { name: 'startDate', title: t('label.start_date'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'endDate', title: t('label.end_date'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_HOLIDAY)) {
      dispatch(
        fetchHolidays(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          setLoading,
        ),
      );
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  useEffect(() => {
    return () => {
      dispatch(setEmptyHolidays());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchHolidays(
        {
          ...params,
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const handleAfterDelete = () => {
    dispatch(
      fetchHolidays(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteHoliday(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_HOLIDAY))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Setting')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={holidays?.payload ?? []}
          route={ROUTE_PATH.HOLIDAY + '/'}
          idxColumnsFilter={[1]}
          dateCols={[3, 2]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_HOLIDAY)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_HOLIDAY)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_HOLIDAY)}
          filters={filters}
          filterFunction={filterFunction}
          total={holidays?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default HolidayPage;

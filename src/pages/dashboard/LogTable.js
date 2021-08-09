import { CCard, CCardHeader } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES } from 'src/constants/key';
import { fetchLogs, setEmptyLogs } from 'src/stores/actions/log';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef) &&
    JSON.stringify(prevProps.paging.loading) === JSON.stringify(nextProps.paging.loading)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const LogTable = ({ t }) => {
  const dispatch = useDispatch();
  const logData = useSelector((state) => state.log.data);
  const [columnDef, setColumnDef] = useState([
    { name: 'user', title: t('label.log_user'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'message', title: t('label.log_message'), align: 'left', width: '50%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '25%', wordWrapEnabled: true },
  ]);

  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: true,
  });
  const onCurrentPageChange = (pageNumber) => {
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  const onTotalChange = (total) => {
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));
  };
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    dispatch(
      fetchLogs(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  useEffect(() => {
    return () => {
      dispatch(setEmptyLogs());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setColumnDef([
      { name: 'user', title: t('label.log_user'), align: 'left', width: '25%', wordWrapEnabled: true },
      { name: 'message', title: t('label.log_message'), align: 'left', width: '50%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '25%', wordWrapEnabled: true },
    ]);
  }, [t]);
  return (
    <CCard>
      <CCardHeader>
        <b>{t('label.list_activity')}</b>
      </CCardHeader>
      <MemoizedQTable
        t={t}
        disableFilter={true}
        columnDef={columnDef}
        data={logData?.payload ?? []}
        disableEditColum={true}
        paging={paging}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        disableToolBar={true}
        linkCols={[{ name: 'message' }]}
        total={logData?.total ?? 0}
      />
    </CCard>
  );
};

export default LogTable;

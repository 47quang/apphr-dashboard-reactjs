import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { fetchRenewContracts, setEmptyRenewContracts } from 'src/stores/actions/contract';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const RenewContract = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const renewContract = useSelector((state) => state.contract.renewContract);
  const [columnDef, setColumnDef] = useState([
    { name: 'user', title: t('label.log_user'), align: 'left', width: '25%', wordWrapEnabled: true },
    // { name: 'message', title: t('label.log_message'), align: 'left', width: '50%', wordWrapEnabled: true },
    // { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '25%', wordWrapEnabled: true },
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
    if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
      dispatch(
        fetchRenewContracts(
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
      dispatch(setEmptyRenewContracts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setColumnDef([
      { name: 'user', title: t('label.log_user'), align: 'left', width: '25%', wordWrapEnabled: true },
      // { name: 'message', title: t('label.log_message'), align: 'left', width: '50%', wordWrapEnabled: true },
      // { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '25%', wordWrapEnabled: true },
    ]);
  }, [t]);
  if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
    return (
      <MemoizedQTable
        t={t}
        disableFilter={true}
        columnDef={columnDef}
        data={renewContract?.payload ?? []}
        disableEditColum={true}
        paging={paging}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        disableToolBar={true}
        linkCols={[{ name: 'message' }]}
        total={renewContract?.total ?? 0}
      />
    );
  else return <Page404 />;
};

export default RenewContract;

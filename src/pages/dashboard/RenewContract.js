import { CCard, CCardHeader } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterNeedRenew from 'src/components/charts/FilterNeedRenew';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, ROUTE_PATH } from 'src/constants/key';
import { fetchRenewContracts, setEmptyRenewContracts } from 'src/stores/actions/contract';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef) &&
    JSON.stringify(prevProps.paging.loading) === JSON.stringify(nextProps.paging.loading)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const RenewContract = ({ t }) => {
  const dispatch = useDispatch();
  const renewContract = useSelector((state) => state.contract.renewContract);
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.contract_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.contract_fullname'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'employee', title: t('label.employee'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'expiredDate', title: t('label.expiredDate'), align: 'left', width: '15%', wordWrapEnabled: true },
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
    dispatch(fetchRenewContracts({ days: 30 }, setLoading));
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
      { name: 'code', title: t('label.contract_code'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'fullname', title: t('label.contract_fullname'), align: 'left', width: '30%', wordWrapEnabled: true },
      { name: 'employee', title: t('label.employee'), align: 'left', width: '30%', wordWrapEnabled: true },
      { name: 'expiredDate', title: t('label.expiration_date'), align: 'left', width: '20%', wordWrapEnabled: true },
    ]);
  }, [t]);
  const handleFunction = (values) => {
    dispatch(fetchRenewContracts(values, onTotalChange, setLoading));
  };
  return (
    <CCard>
      <CCardHeader>
        <b>{t('label.list_contract_need_renew')}</b>
      </CCardHeader>
      <FilterNeedRenew handleFunction={handleFunction} />
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
        linkCols={[
          { name: 'code', id: 'id', route: `${ROUTE_PATH.NAV_CONTRACT}/` },
          { name: 'employee', id: 'profileId', route: `${ROUTE_PATH.PROFILE}/` },
        ]}
        total={renewContract?.total ?? 0}
      />
    </CCard>
  );
};

export default RenewContract;

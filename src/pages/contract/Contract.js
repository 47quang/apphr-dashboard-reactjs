import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH, FILTER_OPERATOR } from 'src/constants/key';
import { deleteContract, fetchContractTable } from 'src/stores/actions/contract';
import Page404 from '../page404/Page404';

const Contract = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDefOfAccounts = [
    { name: 'code', title: t('label.contract_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.contract_fullname'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'type', title: t('label.contract_type'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'employee', title: t('label.employee'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'status', title: t('label.status'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'handleDate', title: t('label.signature_date'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'startWork', title: t('label.job_start_date'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const filters = {
    code: {
      title: t('label.contract_code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    type: {
      title: t('label.contract_type'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        {
          id: 'limitation',
          name: t('label.limitation'),
        },
        {
          id: 'un_limitation',
          name: t('label.un_limitation'),
        },
        {
          id: 'season',
          name: t('label.season'),
        },
      ],
    },
    firstname: {
      title: t('label.employee_first_name'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    lastname: {
      title: t('label.employee_last_name'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    fullname: {
      title: t('label.contract_fullname'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
      type: 'text',
    },
    profile_code: {
      title: t('label.employee_code'),
      operates: [
        {
          id: FILTER_OPERATOR.LIKE,
          name: t('filter_operator.like'),
        },
      ],
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
          id: 'active',
          name: t('label.active'),
        },
        {
          id: 'inactive',
          name: t('label.inactive'),
        },
      ],
    },
  };
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contract.contracts);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    loading: false,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
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
    if (permissionIds.includes(PERMISSION.LIST_USER))
      dispatch(
        fetchContractTable(
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
  const filterFunction = (params) => {
    dispatch(
      fetchContractTable(
        {
          ...params,
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  const handleAfterDelete = () => {
    dispatch(
      fetchContractTable(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteContract(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_USER))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDefOfAccounts}
          data={contracts}
          route={ROUTE_PATH.NAV_CONTRACT + '/'}
          deleteRow={deleteRow}
          //linkCols={[{ name: 'profileId', route: `${ROUTE_PATH.PROFILE}/` }]}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_USER)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_USER)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_USER)}
          filters={filters}
          filterFunction={filterFunction}
          fixed={true}
        />
      </CContainer>
    );
  else return <Page404 />;
};

export default Contract;

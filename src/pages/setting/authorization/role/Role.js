import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deleteRole, fetchRoles } from 'src/stores/actions/role';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const Role = ({ t, location, history }) => {
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.role_code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.role_name'), align: 'left', width: '50%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
  ]);
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
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
  const filters = {
    code: {
      title: t('label.role_code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.role_name'),
      operates: operatesText,
      type: 'text',
    },
  };
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

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    setColumnDef([
      { name: 'code', title: t('label.role_code'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'name', title: t('label.role_name'), align: 'left', width: '50%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ROLE))
      dispatch(
        fetchRoles(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          setLoading,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const filterFunction = (params) => {
    dispatch(
      fetchRoles(
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
      fetchRoles(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteRole(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_ROLE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Setting')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={roles?.payload ?? []}
          route={ROUTE_PATH.ROLE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ROLE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ROLE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ROLE)}
          filters={filters}
          filterFunction={filterFunction}
          total={roles?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default Role;

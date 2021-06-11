import { CContainer } from '@coreui/react';
import { Chip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { COLORS } from 'src/constants/theme';
import { deleteProfile, fetchProfiles, setEmptyProfiles } from 'src/stores/actions/profile';
import Page404 from '../page404/Page404';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const Profile = ({ t, location }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.employee_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'lastname', title: t('label.employee_last_name'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'firstname', title: t('label.employee_first_name'), align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'phone', title: t('label.phone_number'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'gender', title: t('label.sex'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'email', title: t('label.email'), align: 'left', width: '20%', wordWrapEnabled: true },
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
      title: t('label.employee_code'),
      operates: operatesText,
      type: 'text',
    },
    suggestion: {
      title: t('label.employee_full_name'),
      operates: [
        {
          id: FILTER_OPERATOR.AUTOCOMPLETE,
          name: t('filter_operator.autocomplete'),
        },
      ],
      type: 'text',
    },
    phone: {
      title: t('label.phone_number'),
      operates: operatesText,
      type: 'text',
    },
    gender: {
      title: t('label.sex'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        {
          id: 'male',
          name: t('label.male'),
        },
        {
          id: 'female',
          name: t('label.female'),
        },
      ],
    },
    email: {
      title: t('label.email'),
      operates: operatesText,
      type: 'text',
    },
  };
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    loading: false,
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

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    setColumnDef([
      { name: 'code', title: t('label.employee_code'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'lastname', title: t('label.employee_last_name'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'firstname', title: t('label.employee_first_name'), align: 'left', width: '10%', wordWrapEnabled: true },
      { name: 'phone', title: t('label.phone_number'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'gender', title: t('label.sex'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'email', title: t('label.email'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_PROFILE))
      dispatch(
        fetchProfiles(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          setLoading,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  useEffect(() => {
    return () => {
      dispatch(setEmptyProfiles());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchProfiles(
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
      fetchProfiles(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteProfile(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  const statusComponent = (value, colName) => {
    return (
      <Chip
        label={value === 'male' ? t('label.male') : t('label.female')}
        className="mx-1 my-1 px-0 py-0"
        style={{
          backgroundColor: value === 'male' ? COLORS.FULLY_ROLL_CALL : COLORS.FULLY_ABSENT_ROLL_CALL,
        }}
      />
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_PROFILE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Profile')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={profiles?.payload ?? []}
          route={ROUTE_PATH.PROFILE + '/'}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          statusCols={['gender']}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_PROFILE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_PROFILE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_PROFILE)}
          filters={filters}
          filterFunction={filterFunction}
          fixed={true}
          statusComponent={statusComponent}
          isExportEmployeeSalary={true}
          disableExportAllSalary={true}
          disableExportProfile={true}
          disableImportProfile={true}
          total={profiles?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};

export default Profile;

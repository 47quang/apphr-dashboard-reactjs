import { CContainer } from '@coreui/react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { COLORS } from 'src/constants/theme';
import Page404 from 'src/pages/page404/Page404';
import { deleteAttribute, fetchAttributes, setEmptyContractAttributes } from 'src/stores/actions/attribute';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef) &&
    JSON.stringify(prevProps.paging.loading) === JSON.stringify(nextProps.paging.loading)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const ContractAttribute = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.attribute.attributes);
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.attribute_name'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'type', title: t('label.attribute_type'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
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
      title: t('label.code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.attribute_name'),
      operates: operatesText,
      type: 'text',
    },
    type: {
      title: t('label.attribute_type'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        { id: 'date', name: t('label.date') },
        { id: 'text', name: t('label.text') },
        { id: 'textArea', name: t('label.textArea') },
      ],
    },
  };
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

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    setColumnDef([
      { name: 'code', title: t('label.code'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'name', title: t('label.attribute_name'), align: 'left', width: '30%', wordWrapEnabled: true },
      { name: 'type', title: t('label.attribute_type'), align: 'left', width: '20%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
      dispatch(
        fetchAttributes(
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
      dispatch(setEmptyContractAttributes());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchAttributes(
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
      fetchAttributes(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteAttribute(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  const statusComponent = (value, colName) => {
    return (
      <Chip
        label={value === 'date' ? t('label.date') : value === 'text' ? t('label.text') : t('label.textArea')}
        className="m-0 p-0"
        style={{
          backgroundColor: value === 'date' ? COLORS.FULLY_ROLL_CALL : value === 'text' ? COLORS.BLUE : COLORS.FULLY_ABSENT_ROLL_CALL,
        }}
      />
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Contract Attribute')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={attributes?.payload ?? []}
          route={ROUTE_PATH.CONTRACT_ATTRIBUTE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          statusCols={['type']}
          statusComponent={statusComponent}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ALLOWANCE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ALLOWANCE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ALLOWANCE)}
          filters={filters}
          filterFunction={filterFunction}
          total={attributes?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
ContractAttribute.propTypes = {
  t: PropTypes.func,
};
export default ContractAttribute;

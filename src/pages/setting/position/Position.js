import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deletePosition, fetchPositions } from 'src/stores/actions/position';

const Position = ({ t, location, history }) => {
  const columnDef = [
    { name: 'code', title: t('label.position_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.position_name'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'branchName', title: t('label.branch'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'departmentName', title: t('label.department'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  const dispatch = useDispatch();
  const positions = useSelector((state) => state.position.positions);
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
      title: t('label.position_code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.position_name'),
      operates: operatesText,
      type: 'text',
    },
  };
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_POSITION))
      dispatch(fetchPositions({ page: paging.currentPage, perpage: paging.pageSize }, onTotalChange, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const filterFunction = (params) => {
    dispatch(
      fetchPositions(
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
    dispatch(fetchPositions({ page: paging.currentPage, perpage: paging.pageSize }, onTotalChange, setLoading));
  };
  const deleteRow = async (rowId) => {
    dispatch(deletePosition({ id: rowId }, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_POSITION))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          columnDef={columnDef}
          data={positions.map((p) => {
            p.branchName = p.branch?.name;
            p.departmentName = p.department?.name;
            return p;
          })}
          t={t}
          route={ROUTE_PATH.POSITION + '/'}
          idxColumnsFilter={[0, 2]}
          deleteRow={deleteRow}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_POSITION)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_POSITION)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_POSITION)}
          filters={filters}
          filterFunction={filterFunction}
        />
      </CContainer>
    );
  else return <Page404 />;
};
export default Position;

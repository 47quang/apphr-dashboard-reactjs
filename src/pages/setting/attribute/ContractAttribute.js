import { CContainer } from '@coreui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { deleteAttribute, fetchAttributes } from 'src/stores/actions/attribute';

const ContractAttribute = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.attribute.attributes);
  const columnDef = [
    { name: 'id', title: t('label.id'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'name', title: t('label.attribute_name'), align: 'left', width: '40%', wordWrapEnabled: true },
    { name: 'type', title: t('label.attribute_type'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
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
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
      dispatch(
        fetchAttributes(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
          },
          onTotalChange,
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = async (rowId) => {
    dispatch(deleteAttribute(rowId, t('message.successful_delete')));
    dispatch(fetchAttributes());
  };
  if (permissionIds.includes(PERMISSION.LIST_ALLOWANCE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={attributes}
          route={ROUTE_PATH.CONTRACT_ATTRIBUTE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ALLOWANCE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ALLOWANCE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ALLOWANCE)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
ContractAttribute.propTypes = {
  t: PropTypes.func,
};
export default ContractAttribute;

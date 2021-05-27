import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteArticleType, fetchTypes } from 'src/stores/actions/articleType';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';

const ArticleType = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const types = useSelector((state) => state.articleType.types);
  const columnDef = [
    { name: 'code', title: t('label.article_type_code'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.article_type_name'), align: 'left', width: '50%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
  ];
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
      title: t('label.article_type_code'),
      operates: operatesText,
      type: 'text',
    },
    name: {
      title: t('label.article_type_name'),
      operates: operatesText,
      type: 'text',
    },
  };
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
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
    if (permissionIds.includes(PERMISSION.LIST_TYPE_ARTICLE))
      dispatch(
        fetchTypes(
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
      fetchTypes(
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
      fetchTypes(
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
    dispatch(deleteArticleType(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_TYPE_ARTICLE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={types}
          route={ROUTE_PATH.ARTICLE_TYPE + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_TYPE_ARTICLE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_TYPE_ARTICLE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_TYPE_ARTICLE)}
          filters={filters}
          filterFunction={filterFunction}
        />
      </CContainer>
    );
  else return <Page404 />;
};
ArticleType.propTypes = {
  t: PropTypes.func,
};
export default ArticleType;

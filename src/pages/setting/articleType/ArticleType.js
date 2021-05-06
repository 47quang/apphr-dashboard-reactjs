import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteArticleType, fetchTypes } from 'src/stores/actions/articleType';
import PropTypes from 'prop-types';
import Page404 from 'src/pages/page404/Page404';

const ArticleType = ({ t }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const types = useSelector((state) => state.articleType.types);
  const columnDef = [
    { name: 'code', title: t('label.article_type_code'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'name', title: t('label.article_type_name'), align: 'left', width: '60%', wordWrapEnabled: true },
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
    if (permissionIds.includes(PERMISSION.LIST_TYPE_ARTICLE))
      dispatch(
        fetchTypes(
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
    dispatch(deleteArticleType(rowId, t('message.successful_delete')));
    dispatch(fetchTypes());
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
        />
      </CContainer>
    );
  else return <Page404 />;
};
ArticleType.propTypes = {
  t: PropTypes.func,
};
export default ArticleType;

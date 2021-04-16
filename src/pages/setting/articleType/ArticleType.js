import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteArticleType, fetchTypes } from 'src/stores/actions/articleType';
import PropTypes from 'prop-types';
const ArticleType = ({ t }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.articleType.types);
  const columnDef = [
    { name: 'code', title: t('label.article_type_code'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'name', title: t('label.article_type_name'), align: 'left', width: '60%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
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
      />
    </CContainer>
  );
};
ArticleType.propTypes = {
  t: PropTypes.func,
};
export default ArticleType;

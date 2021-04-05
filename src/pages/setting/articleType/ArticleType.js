import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    dispatch(fetchTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteArticleType(rowId, t('message.successful_delete')));
    dispatch(fetchTypes());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={types} route={ROUTE_PATH.ARTICLE_TYPE + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
ArticleType.propTypes = {
  t: PropTypes.func,
};
export default ArticleType;

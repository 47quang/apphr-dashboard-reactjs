import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteArticle, fetchArticles } from 'src/stores/actions/article';
import PropTypes from 'prop-types';
const Notification = ({ t }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);
  const columnDef = [
    { name: 'code', title: t('label.notification_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'typeId', title: t('label.notification_type'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'title', title: t('label.notification_title'), align: 'left', width: '25%', wordWrapEnabled: true },
    // { name: 'branchIds', title: t('label.notification_branches') },
    // { name: 'departmentIds', title: t('label.notification_departments') },
    // { name: 'positionIds', title: t('label.notification_positions') },
    { name: 'description', title: t('label.notification_description'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  useEffect(() => {
    dispatch(fetchArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteArticle(rowId, t('message.successful_delete')));
    dispatch(fetchArticles());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={articles} route={ROUTE_PATH.NOTIFICATION + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
Notification.propTypes = {
  t: PropTypes.func,
};
export default Notification;

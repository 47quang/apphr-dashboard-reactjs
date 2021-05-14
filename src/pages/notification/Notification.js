import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteArticle, fetchArticles } from 'src/stores/actions/article';
import PropTypes from 'prop-types';
import Page404 from '../page404/Page404';
const Notification = ({ t }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const columnDef = [
    { name: 'code', title: t('label.notification_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'typeId', title: t('label.notification_type'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'title', title: t('label.notification_title'), align: 'left', width: '25%', wordWrapEnabled: true },
    // { name: 'ARTICLEIds', title: t('label.notification_ARTICLEes') },
    // { name: 'departmentIds', title: t('label.notification_departments') },
    // { name: 'positionIds', title: t('label.notification_positions') },
    { name: 'description', title: t('label.notification_description'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    loading: false,
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
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ARTICLE))
      dispatch(
        fetchArticles(
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

  const deleteRow = async (rowId) => {
    dispatch(deleteArticle(rowId, t('message.successful_delete')));
    dispatch(
      fetchArticles(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
  };
  if (permissionIds.includes(PERMISSION.LIST_ARTICLE))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable
          t={t}
          columnDef={columnDef}
          data={articles}
          route={ROUTE_PATH.NOTIFICATION + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ARTICLE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ARTICLE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ARTICLE)}
        />
      </CContainer>
    );
  else return <Page404 />;
};
Notification.propTypes = {
  t: PropTypes.func,
};
export default Notification;

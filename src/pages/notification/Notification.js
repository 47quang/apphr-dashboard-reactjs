import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { deleteArticle, fetchArticles, setEmptyArticles } from 'src/stores/actions/article';
import PropTypes from 'prop-types';
import Page404 from '../page404/Page404';
import { Helmet } from 'react-helmet';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const Notification = ({ t }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const [columnDef, setColumnDef] = useState([
    { name: 'code', title: t('label.notification_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'type', title: t('label.notification_type'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'title', title: t('label.notification_title'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'description', title: t('label.notification_description'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
  ]);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    loading: false,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
  });
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
      title: t('label.notification_code'),
      operates: operatesText,
      type: 'text',
    },
    title: {
      title: t('label.notification_title'),
      operates: operatesText,
      type: 'text',
    },
    type_code: {
      title: t('label.article_type_code'),
      operates: operatesText,
      type: 'text',
    },
    type_name: {
      title: t('label.article_type_name'),
      operates: operatesText,
      type: 'text',
    },
  };

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
      { name: 'code', title: t('label.notification_code'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'type', title: t('label.notification_type'), align: 'left', width: '15%', wordWrapEnabled: true },
      { name: 'title', title: t('label.notification_title'), align: 'left', width: '25%', wordWrapEnabled: true },
      { name: 'description', title: t('label.notification_description'), align: 'left', width: '30%', wordWrapEnabled: true },
      { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '15%', wordWrapEnabled: true },
    ]);
  }, [t]);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ARTICLE))
      dispatch(
        fetchArticles(
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
      dispatch(setEmptyArticles());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchArticles(
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
      fetchArticles(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        setLoading,
      ),
    );
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteArticle(rowId, t('message.successful_delete'), handleAfterDelete));
  };
  if (permissionIds.includes(PERMISSION.LIST_ARTICLE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <Helmet>
          <title>{'APPHR | ' + t('Notification')}</title>
        </Helmet>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={articles?.payload ?? []}
          route={ROUTE_PATH.NOTIFICATION + '/'}
          idxColumnsFilter={[0, 1]}
          deleteRow={deleteRow}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          paging={paging}
          disableDelete={!permissionIds.includes(PERMISSION.DELETE_ARTICLE)}
          disableCreate={!permissionIds.includes(PERMISSION.CREATE_ARTICLE)}
          disableEdit={!permissionIds.includes(PERMISSION.GET_ARTICLE)}
          filters={filters}
          filterFunction={filterFunction}
          fixed={true}
          total={articles?.total ?? 0}
        />
      </CContainer>
    );
  else return <Page404 />;
};
Notification.propTypes = {
  t: PropTypes.func,
};
export default Notification;

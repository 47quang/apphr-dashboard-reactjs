import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { fetchArticle, updateArticle } from 'src/stores/actions/article';
import Page404 from '../page404/Page404';
import NotificationForm from './NotificationForm';

const UpdateNotification = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const articleInfoForm = useRef();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.article);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_ARTICLE)) dispatch(fetchArticle(match?.params?.id, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    form.typeId = parseInt(form.typeId);
    dispatch(updateArticle(form, t('message.successful_update')));
  };
  const buttons = permissionIds.includes(PERMISSION.UPDATE_ARTICLE)
    ? [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.NOTIFICATION);
          },
          name: t('label.back'),
          position: 'left',
        },
        {
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            articleInfoForm.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            articleInfoForm.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.NOTIFICATION);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_ARTICLE))
    return (
      <NotificationForm
        t={t}
        articleRef={articleInfoForm}
        article={article}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateNotification;

import { CContainer } from '@coreui/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { createArticle, setEmptyArticle } from 'src/stores/actions/article';
import Page404 from '../page404/Page404';
import NotificationForm from './NotificationForm';

const NewNotification = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const articleInfoForm = useRef();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.article);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_ARTICLE)) dispatch(setEmptyArticle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;

    delete form.id;
    form.typeId = parseInt(form.typeId);
    dispatch(createArticle(form, history, t('message.successful_create')));
  };
  const buttons = [
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
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        articleInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_ARTICLE))
    return (
      <CContainer fluid className="c-main m-auto p-4">
        <div className="m-auto col-lg-12">
          <NotificationForm t={t} articleRef={articleInfoForm} article={article} buttons={buttons} submitForm={submitForm} isCreate={true} />
        </div>
      </CContainer>
    );
  else return <Page404 />;
};

export default NewNotification;

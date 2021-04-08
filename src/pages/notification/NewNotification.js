import { CContainer } from '@coreui/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { createArticle, setEmptyArticle } from 'src/stores/actions/article';
import NotificationForm from './NotificationForm';

const NewNotification = ({ t, location, history }) => {
  const articleInfoForm = useRef();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.article);

  useEffect(() => {
    dispatch(setEmptyArticle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
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
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto col-lg-12">
        <NotificationForm t={t} articleRef={articleInfoForm} article={article} buttons={buttons} submitForm={submitForm} />
      </div>
    </CContainer>
  );
};

export default NewNotification;

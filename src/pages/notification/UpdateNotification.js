import { CContainer } from '@coreui/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchArticle, updateArticle } from 'src/stores/actions/article';
import NotificationForm from './NotificationForm';

const UpdateNotification = ({ t, location, history, match }) => {
  const articleInfoForm = useRef();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.article);

  useEffect(() => {
    dispatch(fetchArticle(match?.params?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
    form.typeId = parseInt(form.typeId);
    dispatch(updateArticle(form, history, t('message.successful_create')));
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
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto col-lg-12">
        <NotificationForm t={t} articleRef={articleInfoForm} article={article} buttons={buttons} submitForm={submitForm} />
      </div>
    </CContainer>
  );
};

export default UpdateNotification;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { ArticleTypeSchema } from 'src/schema/formSchema';
import { createArticleType, setEmptyArticleType } from 'src/stores/actions/articleType';
import ArticleTypeItemBody from './ArticleTypeItemBody';

const NewType = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const typeInfoForm = useRef();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.articleType.type);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_TYPE_ARTICLE)) dispatch(setEmptyArticleType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
    delete form.id;
    dispatch(createArticleType(form, history, t('message.successful_create')));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.ARTICLE_TYPE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        typeInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_TYPE_ARTICLE))
    return (
      <ArticleTypeItemBody typeRef={typeInfoForm} type={type} t={t} validationSchema={ArticleTypeSchema} buttons={buttons} submitForm={submitForm} />
    );
  else return <Page404 />;
};

export default NewType;

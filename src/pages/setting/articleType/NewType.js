import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { ArticleTypeSchema } from 'src/schema/formSchema';
import { createArticleType, setEmptyArticleType } from 'src/stores/actions/articleType';
import ArticleTypeItemBody from './ArticleTypeItemBody';

const NewType = ({ t, location, history }) => {
  const typeInfoForm = useRef();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.articleType.type);

  useEffect(() => {
    dispatch(setEmptyArticleType());
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
  return <ArticleTypeItemBody ref={typeInfoForm} type={type} t={t} validationSchema={ArticleTypeSchema} buttons={buttons} submitForm={submitForm} />;
};

export default NewType;

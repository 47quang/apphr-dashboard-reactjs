import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { ArticleTypeSchema } from 'src/schema/formSchema';
import { fetchType, updateArticleType } from 'src/stores/actions/articleType';
import ArticleTypeItemBody from './ArticleTypeItemBody';

const UpdateType = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const typeInfoForm = useRef();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.articleType.type);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_TYPE_ARTICLE)) dispatch(fetchType(match.params?.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API UPDATE
    dispatch(updateArticleType(form, t('message.successful_update')));
  };
  const buttons = permissionIds.includes(PERMISSION.UPDATE_TYPE_ARTICLE)
    ? [
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
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            typeInfoForm.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            typeInfoForm.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.ARTICLE_TYPE);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_TYPE_ARTICLE))
    return (
      <ArticleTypeItemBody typeRef={typeInfoForm} type={type} t={t} validationSchema={ArticleTypeSchema} buttons={buttons} submitForm={submitForm} />
    );
  else return <Page404 />;
};

export default UpdateType;

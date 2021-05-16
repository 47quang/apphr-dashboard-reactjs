import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { NewFieldContract } from 'src/schema/formSchema';
import { fetchAttribute, updateAttribute } from 'src/stores/actions/attribute';
import ContractAttributeItemBody from './ContractAttributeItemBody';

const UpdateContractAttribute = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const attributeInfoForm = useRef();
  const dispatch = useDispatch();
  const attribute = useSelector((state) => state.attribute.attribute);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_ALLOWANCE)) dispatch(fetchAttribute(match.params?.id, setLoading));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API UPDATE
    dispatch(updateAttribute(form, t('message.successful_update')));
  };
  const buttons = permissionIds.includes(PERMISSION.UPDATE_ALLOWANCE)
    ? [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.CONTRACT_ATTRIBUTE);
          },
          name: t('label.back'),
          position: 'left',
        },
        {
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            attributeInfoForm.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            attributeInfoForm.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.CONTRACT_ATTRIBUTE);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_ALLOWANCE))
    return (
      <ContractAttributeItemBody
        attributeRef={attributeInfoForm}
        attribute={attribute}
        t={t}
        validationSchema={NewFieldContract}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
      />
    );
  else return <Page404 />;
};

export default UpdateContractAttribute;

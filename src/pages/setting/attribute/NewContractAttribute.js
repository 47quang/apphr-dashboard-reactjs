import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { NewFieldContract } from 'src/schema/formSchema';
import { createAttribute, setEmptyAttribute } from 'src/stores/actions/attribute';
import ContractAttributeItemBody from './ContractAttributeItemBody';

const NewContractAttribute = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const attributeInfoForm = useRef();
  const dispatch = useDispatch();
  const attribute = useSelector((state) => state.attribute.attribute);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_ALLOWANCE)) dispatch(setEmptyAttribute());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
    delete form.id;
    dispatch(createAttribute(form, history, t('message.successful_create')));
  };
  const buttons = [
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
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        attributeInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_ALLOWANCE))
    return (
      <ContractAttributeItemBody
        attributeRef={attributeInfoForm}
        attribute={attribute}
        t={t}
        validationSchema={NewFieldContract}
        buttons={buttons}
        submitForm={submitForm}
        isCreate={true}
      />
    );
  else return <Page404 />;
};

export default NewContractAttribute;

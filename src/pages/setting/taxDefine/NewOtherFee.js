import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { OtherFeeSchema } from 'src/schema/formSchema';
import { createPayment, setEmptyPayment } from 'src/stores/actions/payment';
import OtherFeeItemBody from './OtherFeeItemBody';

const NewOtherFee = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const feeInfoForm = useRef();
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment.payment);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_WAGE)) dispatch(setEmptyPayment());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
    delete form.id;
    console.log(form);
    // dispatch(createPayment(form, history, t('message.successful_create')));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.TAX_DETAIL);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        feeInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_WAGE))
    return (
      <OtherFeeItemBody
        paymentRef={feeInfoForm}
        payment={payment}
        t={t}
        validationSchema={OtherFeeSchema}
        buttons={buttons}
        submitForm={submitForm}
      />
    );
  else return <Page404 />;
};

export default NewOtherFee;

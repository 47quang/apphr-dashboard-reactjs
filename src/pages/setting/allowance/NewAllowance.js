import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { AllowanceSchema } from 'src/schema/formSchema';
import { createAllowance, setEmptyAllowance } from 'src/stores/actions/allowance';
import AllowanceItemBody from './AllowanceItemBody';

const NewAllowance = ({ t, location, history }) => {
  const allowanceInfoForm = useRef();
  const dispatch = useDispatch();
  const allowance = useSelector((state) => state.allowance.allowance);

  useEffect(() => {
    dispatch(setEmptyAllowance());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
    delete form.id;
    dispatch(createAllowance(form, history, t('message.successful_create')));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.ALLOWANCE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        allowanceInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  return (
    <AllowanceItemBody
      allowanceRef={allowanceInfoForm}
      allowance={allowance}
      t={t}
      validationSchema={AllowanceSchema}
      buttons={buttons}
      submitForm={submitForm}
    />
  );
};

export default NewAllowance;

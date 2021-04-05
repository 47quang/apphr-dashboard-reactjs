import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { WageSchema } from 'src/schema/formSchema';
import { createWage, setEmptyWage } from 'src/stores/actions/wage';
import WageItemBody from './WageItemBody';

const NewWage = ({ t, location, history }) => {
  const wageInfoForm = useRef();
  const dispatch = useDispatch();
  const wage = useSelector((state) => state.wage.wage);

  useEffect(() => {
    dispatch(setEmptyWage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API CREATE
    delete form.id;
    dispatch(createWage(form, history, t('message.successful_create')));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.WAGE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        wageInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  return <WageItemBody wageRef={wageInfoForm} wage={wage} t={t} validationSchema={WageSchema} buttons={buttons} submitForm={submitForm} />;
};

export default NewWage;

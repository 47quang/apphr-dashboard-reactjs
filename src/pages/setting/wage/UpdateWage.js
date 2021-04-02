import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { WageSchema } from 'src/schema/formSchema';
import { fetchWage, updateWage } from 'src/stores/actions/wage';
import WageItemBody from './WageItemBody';

const UpdateWage = ({ t, location, history, match }) => {
  const wageInfoForm = useRef();
  const dispatch = useDispatch();
  const wage = useSelector((state) => state.wage.wage);

  useEffect(() => {
    dispatch(fetchWage(match.params?.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API UPDATE
    dispatch(updateWage(form, t('message.successful_update')));
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
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        wageInfoForm.current.handleReset(e);
      },
      name: t('label.reset'),
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        wageInfoForm.current.handleSubmit(e);
      },
      name: t('label.update'),
    },
  ];
  return <WageItemBody wageRef={wageInfoForm} wage={wage} t={t} validationSchema={WageSchema} buttons={buttons} submitForm={submitForm} />;
};

export default UpdateWage;

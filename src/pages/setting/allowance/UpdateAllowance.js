import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { AllowanceSchema } from 'src/schema/formSchema';
import { fetchAllowance, updateAllowance } from 'src/stores/actions/allowance';
import AllowanceItemBody from './AllowanceItemBody';

const UpdateWage = ({ t, location, history, match }) => {
  const allowanceInfoForm = useRef();
  const dispatch = useDispatch();
  const allowance = useSelector((state) => state.allowance.allowance);

  useEffect(() => {
    dispatch(fetchAllowance(match.params?.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API UPDATE
    dispatch(updateAllowance(form, t('message.successful_update')));
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
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        allowanceInfoForm.current.handleReset(e);
      },
      name: t('label.reset'),
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        allowanceInfoForm.current.handleSubmit(e);
      },
      name: t('label.update'),
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

export default UpdateWage;

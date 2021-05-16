import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { AllowanceSchema } from 'src/schema/formSchema';
import { fetchAllowance, updateAllowance } from 'src/stores/actions/allowance';
import AllowanceItemBody from './AllowanceItemBody';

const UpdateAllowance = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const allowanceInfoForm = useRef();
  const dispatch = useDispatch();
  const allowance = useSelector((state) => state.allowance.allowance);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_ALLOWANCE)) dispatch(fetchAllowance(match.params?.id, setLoading));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API UPDATE
    dispatch(updateAllowance(form, t('message.successful_update')));
  };
  const buttons = permissionIds.includes(PERMISSION.UPDATE_ALLOWANCE)
    ? [
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
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.ALLOWANCE);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_ALLOWANCE))
    return (
      <AllowanceItemBody
        allowanceRef={allowanceInfoForm}
        allowance={allowance}
        t={t}
        validationSchema={AllowanceSchema}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateAllowance;

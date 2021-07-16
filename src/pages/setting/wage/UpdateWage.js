import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { WageSchema } from 'src/schema/formSchema';
import { fetchWage, updateWage } from 'src/stores/actions/wage';
import WageItemBody from './WageItemBody';

const UpdateWage = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const wageInfoForm = useRef();
  const dispatch = useDispatch();
  const wage = useSelector((state) => state.wage.wage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_WAGE)) dispatch(fetchWage(match.params?.id, setLoading));
    else setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    // Call API UPDATE
    dispatch(updateWage(form, t('message.successful_update')));
  };
  const buttons = permissionIds.includes(PERMISSION.UPDATE_WAGE)
    ? [
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
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.WAGE);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (loading)
    return (
      <div className="text-center pt-4">
        <CircularProgress />
      </div>
    );
  if (permissionIds.includes(PERMISSION.GET_WAGE))
    return (
      <WageItemBody
        wageRef={wageInfoForm}
        wage={wage}
        t={t}
        validationSchema={WageSchema}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateWage;

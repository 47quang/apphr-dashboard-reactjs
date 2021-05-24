import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { fetchHoliday, setEmptyHoliday, updateHoliday } from 'src/stores/actions/holiday';
import HolidayItemBody from './HolidayItemBody';

const UpdateHoliday = ({ t, location, history, match }) => {
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holiday.holiday);
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_HOLIDAY)) {
      dispatch(fetchHoliday(match?.params?.id.split('=')[1], setLoading)); //param.id = ".id=4"
      return () => {
        dispatch(setEmptyHoliday());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    form.coefficient = parseInt(form.coefficient);
    dispatch(updateHoliday(form, t('message.successful_update')));
  };

  const buttons = permissionIds.includes(PERMISSION.UPDATE_HOLIDAY)
    ? [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.HOLIDAY);
          },
          name: t('label.back'),
          position: 'left',
        },
        {
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            holidayInfoForm.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            holidayInfoForm.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.HOLIDAY);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_HOLIDAY))
    return (
      <HolidayItemBody
        t={t}
        holidayRef={holidayInfoForm}
        holiday={holiday}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateHoliday;

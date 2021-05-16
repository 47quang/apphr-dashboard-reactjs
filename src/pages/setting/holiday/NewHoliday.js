import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { createHoliday, setEmptyHoliday } from 'src/stores/actions/holiday';
import HolidayItemBody from './HolidayItemBody';

//TODO: translate

const NewHolidayPage = ({ t, location, history }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holiday.holiday);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.CREATE_HOLIDAY)) dispatch(setEmptyHoliday());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    form.coefficient = parseInt(form.coefficient);
    delete form.id;
    dispatch(createHoliday(form, history, t('message.successful_create')));
  };

  const buttons = [
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
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        holidayInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  if (permissionIds.includes(PERMISSION.CREATE_HOLIDAY))
    return <HolidayItemBody t={t} holidayRef={holidayInfoForm} holiday={holiday} buttons={buttons} submitForm={submitForm} isCreate={true} />;
  else return <Page404 />;
};

export default NewHolidayPage;

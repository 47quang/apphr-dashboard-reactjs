import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { changeActions } from 'src/stores/actions/header';
import { createHoliday, setEmptyHoliday } from 'src/stores/actions/holiday';
import HolidayItemBody from './HolidayItemBody';

//TODO: translate

const NewHolidayPage = ({ t, location, history }) => {
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holiday.holiday);

  useEffect(() => {
    dispatch(setEmptyHoliday());

    return () => {
      dispatch(changeActions([]));
    };
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

  return <HolidayItemBody t={t} holidayRef={holidayInfoForm} holiday={holiday} buttons={buttons} submitForm={submitForm} />;
};

export default NewHolidayPage;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    dispatch(createHoliday(form));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        window.history.back();
      },
      name: 'Quay lại',
    },
    {
      type: 'submit',
      className: `btn btn-primary`,
      onClick: (e) => {
        holidayInfoForm.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];

  return <HolidayItemBody holidayRef={holidayInfoForm} holiday={holiday} buttons={buttons} submitForm={submitForm} />;
};

export default NewHolidayPage;

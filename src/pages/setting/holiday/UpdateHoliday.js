import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingHolidayInfoSchema } from 'src/schema/formSchema';
import { changeActions } from 'src/stores/actions/header';
import { fetchHoliday, setEmptyHoliday } from 'src/stores/actions/holiday';
import HolidayItemBody from './HolidayItemBody';

//TODO: translate

const UpdateHoliday = ({ t, location, history, match }) => {
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holiday.holiday);

  useEffect(() => {
    dispatch(fetchHoliday(match?.params?.id.split('=')[1])); //param.id = ".id=4"
    const actions = [
      {
        type: 'primary',
        name: 'Cập nhật',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
      dispatch(setEmptyHoliday());
    };
  }, []);

  const handleSubmit = (event) => {
    holidayInfoForm.current.handleSubmit(event);
  };
  console.log(holiday);
  return <HolidayItemBody holidayRef={holidayInfoForm} holiday={holiday} validationSchema={SettingHolidayInfoSchema} isUpdate={true} />;
};

export default UpdateHoliday;

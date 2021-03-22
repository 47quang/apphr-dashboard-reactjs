import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { changeActions } from 'src/stores/actions/header';
import { fetchHoliday, setEmptyHoliday, updateHoliday } from 'src/stores/actions/holiday';
import HolidayItemBody from './HolidayItemBody';

//TODO: translate

const UpdateHoliday = ({ t, location, history, match }) => {
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holiday.holiday);

  useEffect(() => {
    dispatch(fetchHoliday(match?.params?.id.split('=')[1])); //param.id = ".id=4"
    return () => {
      dispatch(changeActions([]));
      dispatch(setEmptyHoliday());
    };
  }, []);

  const submitForm = (values) => {
    let form = values;
    form.coefficient = parseInt(form.coefficient);
    // Call API UPDATE

    dispatch(updateHoliday(form));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.HOLIDAY);
      },
      name: 'Quay lại',
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        holidayInfoForm.current.handleReset(e);
      },
      name: 'Hoàn tác',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        holidayInfoForm.current.handleSubmit(e);
      },
      name: 'Cập nhật',
    },
  ];

  return <HolidayItemBody holidayRef={holidayInfoForm} holiday={holiday} buttons={buttons} submitForm={submitForm} />;
};

export default UpdateHoliday;

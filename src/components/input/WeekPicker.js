import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useDispatch } from 'react-redux';
import { fetchRollUpTable } from 'src/stores/actions/assignment';

const WeekPicker = ({ fromDate, setFromDate, currentPage, pageSize, onTotalChange }) => {
  const dispatch = useDispatch();
  const calculateActiveWeek = (date) => {
    const sun = date.clone().startOf('week');
    const mon = sun.clone().add(1, 'd');
    const tue = sun.clone().add(2, 'd');
    const wed = sun.clone().add(3, 'd');
    const thu = sun.clone().add(4, 'd');
    const fri = sun.clone().add(5, 'd');
    const sat = sun.clone().add(6, 'd');
    return [sun, mon, tue, wed, thu, fri, sat];
  };

  const [state, setState] = useState({
    focused: false,
    selectedWorkWeek: fromDate.week(),
    selectedYear: fromDate.year(),
    hoveredDays: calculateActiveWeek(fromDate),
    workWeekMarginLeft: 0,
  });
  const isDayHighlighted = (date) => {
    const { hoveredDays } = state;
    let isHighlighted = false;
    hoveredDays.forEach((hoveredDay) => {
      const isDayOfMonthMatch = hoveredDay.date() === date.date();
      const isMonthMatch = hoveredDay.month() === date.month();
      const isYearMatch = hoveredDay.year() === date.year();
      if (isDayOfMonthMatch && isMonthMatch && isYearMatch) {
        isHighlighted = true;
      }
    });
    return isHighlighted;
  };

  const onDateHovered = (date) => {
    setState({
      ...state,
      hoveredDays: calculateActiveWeek(date),
    });
  };

  const onDateChange = (date) => {
    const selectedYear = date.year();
    const selectedWorkWeek = date.week();
    if (selectedWorkWeek === state.selectedWorkWeek) return;
    else {
      let from = date.clone().startOf('week');
      let to = date.clone().endOf('week');
      setFromDate(from);
      dispatch(
        fetchRollUpTable(
          {
            page: currentPage,
            perpage: pageSize,
            from: from,
            to: to,
          },
          onTotalChange,
        ),
      );
      setState({
        ...state,
        selectedYear,
        selectedWorkWeek,
        focused: false,
      });
    }
  };

  const renderCalendarDay = (date) => {
    const dayClasses = classNames('CalendarDay', 'CalendarDay__default', 'CalendarDay_1', 'CalendarDay__default_2');
    let style = {
      width: '39px',
      height: '38px',
    };
    if (date.day) {
      const dayOfMonth = date.day.date();
      const isHighlighted = isDayHighlighted(date.day);
      let style = {
        width: '39px',
        height: '38px',
        backgroundColor: isHighlighted ? '#42a5f5' : 'white',
        color: isHighlighted ? 'white' : 'black',
      };
      return (
        <td key={date.key} style={style} className={dayClasses} onClick={() => onDateChange(date.day)} onMouseEnter={() => onDateHovered(date.day)}>
          {dayOfMonth}
        </td>
      );
    } else {
      return <td key={date.key} style={style} className={dayClasses} />;
    }
  };

  return (
    <SingleDatePicker
      focused={state.focused} // PropTypes.bool
      readOnly={true}
      onDateChange={(date) => console.log('date', date)} // PropTypes.func.isRequired
      date={moment().year(state.selectedYear).week(state.selectedWorkWeek).startOf('week')}
      onFocusChange={({ focused }) => setState({ ...state, focused: !state.focused })} // PropTypes.func.isRequired
      id="single_date_picker" // PropTypes.string.isRequired,
      numberOfMonths={1}
      hideKeyboardShortcutsPanel={true}
      isDayBlocked={() => false}
      isOutsideRange={() => false}
      renderCalendarDay={renderCalendarDay}
      showDefaultInputIcon={true}
    />
  );
};

export default WeekPicker;

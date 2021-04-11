import { CContainer } from '@coreui/react';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  EditRecurrenceMenu,
  Scheduler,
  TodayButton,
  Toolbar,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarForm from 'src/components/calendar/CalendarForm';
import { deleteAssignment, fetchAssignments, setEmptyAssignments } from 'src/stores/actions/assignment';
import { fetchShifts } from 'src/stores/actions/shift';
import { api } from 'src/stores/apis';
import { REDUX_STATE } from 'src/stores/states';
import { isBeforeTypeDate, isSameBeforeTypeDate } from 'src/utils/datetimeUtils';

const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  },
}));

const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

const SchedulerPage = ({ t, history, match }) => {
  const shifts = useSelector((state) => state.shift.shifts);
  const assignments = useSelector((state) => state.assignment.assignments);
  const userId = +match?.params?.id;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: assignments,
    currentDate: '2021-04-12',
    isOpen: false,
    selectedDate: '',
  });

  useEffect(() => {
    dispatch(
      fetchShifts({
        page: 0,
        perpage: 1000,
      }),
    );
    dispatch(fetchAssignments({ userId: userId }));

    return () => {
      dispatch(setEmptyAssignments());
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   setState((preState) => ({
  //     ...preState,
  //     data: assignments,
  //   }));
  // }, [assignments]);
  const changeCurrentDate = (currentDate) => {
    setState({ ...state, currentDate: currentDate });
  };
  const handleClose = () => {
    setState({ ...state, isOpen: false });
  };
  const handleConfirm = async (values) => {
    let { data, selectedDate } = state;
    let startDate = selectedDate.replace('00:00:00', values.start);
    let endDate = selectedDate.replace('00:00:00', values.end);
    let checkValidTask = data.filter((x) => isSameBeforeTypeDate(x.startDate, startDate) && isBeforeTypeDate(startDate, x.endDate));
    if (checkValidTask.length !== 0) {
      dispatch({
        type: REDUX_STATE.notification.SET_NOTI,
        payload: { open: true, type: 'error', message: 'Không thể giao việc trong khung giờ này' },
      });
      setState({
        ...state,
        isOpen: false,
      });
    } else {
      let body = {
        shiftId: +values.shiftId,
        userId: userId,
        date: selectedDate,
      };
      const payload = await api.assignment.post(body).then(({ payload }) => payload);
      const shift = await api.shift.get(values.shiftId).then(({ payload }) => payload);

      data = [
        ...data,
        {
          id: payload.id,
          startDate: startDate,
          endDate: endDate,
          title: shift.name,
        },
      ];
      setState({
        ...state,
        data: data,
        isOpen: false,
      });
    }
  };
  const commitChanges = ({ deleted }) => {
    // setState(async (state) => {
    //   let { data } = state;
    //   const handleAfterDeleted = () => {
    //     data = data.filter((appointment) => appointment.id !== deleted);
    //   };
    //   if (deleted !== undefined) {
    //     dispatch(deleteAssignment(deleted), t('message.successful_delete'), handleAfterDeleted);
    //   }
    //   return { ...state, data: data };
    // });
    console.log('commitChanges');
    //dispatch(deleteAssignment(deleted), t('message.successful_delete'));
  };
  const TimeTableCell = (props) => {
    const classes = useStyles();
    const { startDate } = props;
    const date = moment(startDate);

    const onClickEvent = () => {
      setState({
        ...state,
        selectedDate: moment.utc(props.startDate).startOf('day').format().replace('Z', ''),
        isOpen: true,
      });
    };

    if (date.day() === moment().day()) {
      return <WeekView.TimeTableCell {...props} className={classes.todayCell} onClick={onClickEvent} />;
    }
    if (date.day() === 0 || date.day() === 6) {
      return <WeekView.TimeTableCell {...props} className={classes.weekendCell} onClick={onClickEvent} />;
    }
    return <WeekView.TimeTableCell {...props} onClick={onClickEvent} />;
  };
  console.log('SchedulerPage');
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <React.Fragment>
        <CalendarForm t={t} shifts={shifts} handleCancel={handleClose} isOpen={state.isOpen} handleConfirm={handleConfirm} />
        <Paper>
          <Scheduler data={state.data} height={660}>
            <ViewState currentDate={state.currentDate} onCurrentDateChange={changeCurrentDate} />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <WeekView
              startDayHour={7}
              endDayHour={22}
              cellDuration={60}
              timeTableCellComponent={TimeTableCell}
              dayScaleCellComponent={DayScaleCell}
            />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <EditRecurrenceMenu />
            <Appointments />
            <AppointmentTooltip showDeleteButton />
          </Scheduler>
        </Paper>
      </React.Fragment>
    </CContainer>
  );
};
export default SchedulerPage;

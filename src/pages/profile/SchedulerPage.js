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
import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Delete } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarForm from 'src/components/calendar/CalendarForm';
import { PERMISSION } from 'src/constants/key';
import { createAssignment, deleteAssignment, fetchAssignments, setEmptyAssignments } from 'src/stores/actions/assignment';
import { fetchShifts } from 'src/stores/actions/shift';
import { REDUX_STATE } from 'src/stores/states';
import { isBeforeTypeDate, isSameBeforeTypeDate } from 'src/utils/datetimeUtils';
import Page404 from '../page404/Page404';

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

const SchedulerPage = ({ t, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const shifts = useSelector((state) => state.shift.shifts);
  const assignments = useSelector((state) => state.assignment.assignments);
  const profileId = +match?.params?.id;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    // data: [{ id: 1, title: 'gaf', startDate: '2021-04-14T10:00:00', endDate: '2021-04-14T12:00:00' }],
    currentDate: new Date(),
    isOpen: false,
    selectedDate: '',
    visible: false,
  });

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

  const TimeTableCell = (props) => {
    const classes = useStyles();
    const { startDate } = props;
    const date = moment(startDate);

    const onClickEvent = () => {
      if (permissionIds.includes(PERMISSION.CREATE_ASSIGNMENT))
        setState({
          ...state,
          selectedDate: moment.utc(props.startDate).startOf('day').format().replace('Z', ''),
          isOpen: true,
        });
    };

    if (date.isSame(moment(), 'day')) {
      return <WeekView.TimeTableCell {...props} className={classes.todayCell} onClick={onClickEvent} />;
    }
    if (date.day() === 0 || date.day() === 6) {
      return <WeekView.TimeTableCell {...props} className={classes.weekendCell} onClick={onClickEvent} />;
    }
    return <WeekView.TimeTableCell {...props} onClick={onClickEvent} />;
  };

  useEffect(() => {
    dispatch(
      fetchShifts({
        page: 0,
        perpage: 1000,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_ASSIGNMENT)) {
      var first = state.currentDate.getDate() - state.currentDate.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      var firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), first);
      var lastDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), last);
      lastDay.setHours(23, 59, 59, 0);
      dispatch(fetchAssignments({ profileId: profileId, from: firstDay, to: lastDay }));
      return () => {
        dispatch(setEmptyAssignments());
      };
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentDate]);
  const changeCurrentDate = (currentDate) => {
    setState({
      ...state,
      currentDate: currentDate,
    });
  };
  const handleClose = () => {
    setState({ ...state, isOpen: false });
  };
  const toggleVisibility = () => {
    if (permissionIds.includes(PERMISSION.GET_ASSIGNMENT)) setState({ ...state, visible: !state.visible });
  };
  const handleConfirm = async (values) => {
    let { selectedDate } = state;
    let startDate = selectedDate.replace('00:00:00', values.start);
    let checkValidTask = assignments.filter((x) => isSameBeforeTypeDate(x.startDate, startDate) && isBeforeTypeDate(startDate, x.endDate));
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
        profileId: profileId,
        date: selectedDate,
      };
      dispatch(createAssignment(body, t('message.successful_create')));
      handleClose();
    }
  };
  const style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    header: {
      backgroundSize: 'cover',
    },
    commandButton: {
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
  });
  const Header = withStyles(style, { name: 'Header' })(({ children, appointmentData, classes, ...restProps }) => {
    return (
      <AppointmentTooltip.Header {...restProps} className={classes.header} appointmentData={appointmentData}>
        {permissionIds.includes(PERMISSION.DELETE_ASSIGNMENT) ? (
          <IconButton
            onClick={() => {
              dispatch(deleteAssignment(appointmentData.id, t('message.successful_delete')));
              restProps.onHide();
            }}
            className={classes.commandButton}
          >
            <Delete />
          </IconButton>
        ) : (
          <div />
        )}
      </AppointmentTooltip.Header>
    );
  });
  if (permissionIds.includes(PERMISSION.LIST_ASSIGNMENT))
    return (
      <CContainer fluid className="c-main mb-3 px-4">
        <CalendarForm t={t} shifts={shifts} handleCancel={handleClose} isOpen={state.isOpen} handleConfirm={handleConfirm} />
        <Paper>
          <Scheduler data={assignments} height={660}>
            <ViewState currentDate={state.currentDate} onCurrentDateChange={changeCurrentDate} />
            <EditingState />
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
            <AppointmentTooltip headerComponent={Header} showCloseButton onVisibilityChange={toggleVisibility} />
          </Scheduler>
        </Paper>
      </CContainer>
    );
  else return <Page404 />;
};
export default SchedulerPage;

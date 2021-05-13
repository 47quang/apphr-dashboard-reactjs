import { formatDateTimeScheduleToString, getTimeFromDate, isBeforeTypeDate, parseLocalTime } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const dayIndex = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

export const fetchAssignments = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.assignment
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.startDate = a.startTime;
                a.endDate = a.endTime;
                a.title = a.shift.code + ' - ' + a.shift.name;
                a.location = a.shift.branch.code + ' - ' + a.shift.branch.name;
                return a;
              })
            : [];
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

const compareHours = (a1, a2) => {
  return +a1.startCC.split(':')[0] - a2.startCC.split(':')[0];
};

export const fetchRollUpTable = (params, onTotalChange, setLoading) => {
  if (setLoading) {
    setInterval(10000);

    setLoading(true);
  }
  return (dispatch, getState) => {
    api.profile
      .getRollUpTable(params)
      .then(({ payload, total }) => {
        let data = [];
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                let x = {
                  id: a.id,
                  fullname: a.fullname,
                  avatar: a.avatar,
                  code: a.code,
                  sunday: {
                    assignment: [],
                    future: false,
                  },
                  monday: {
                    assignment: [],
                    future: false,
                  },
                  tuesday: {
                    assignment: [],
                    future: false,
                  },
                  wednesday: {
                    assignment: [],
                    future: false,
                  },
                  thursday: {
                    assignment: [],
                    future: false,
                  },
                  friday: {
                    assignment: [],
                    future: false,
                  },
                  saturday: {
                    assignment: [],
                    future: false,
                  },
                };
                a.assignments.forEach((element) => {
                  let dayTh = new Date(element.startTime).getDay();
                  let thisDate = new Date();
                  thisDate.setHours(23);
                  thisDate.setMinutes(59);
                  thisDate.setSeconds(59);
                  let future = isBeforeTypeDate(thisDate, element.startTime); ///bug
                  x[dayIndex[dayTh]].future = future;
                  x[dayIndex[dayTh]].assignment.push({
                    id: element.id,
                    shiftCode: element.shift.code,
                    point: element.point < 0.95 && element.point !== 0 ? element.point.toFixed(1) : element.point === 0 ? 0 : 1,
                    status: element.status,
                    startCC: parseLocalTime(element.shift.startCC),
                    endCC: parseLocalTime(element.shift.endCC),
                  });
                });
                data.push(x);
                return a;
              })
            : [];
        data =
          data && data.length > 0
            ? data.map((a) => {
                a.sunday.assignment.sort((a1, a2) => compareHours(a1, a2));
                a.monday.assignment.sort((a1, a2) => compareHours(a1, a2));
                a.tuesday.assignment.sort((a1, a2) => compareHours(a1, a2));
                a.wednesday.assignment.sort((a1, a2) => compareHours(a1, a2));
                a.thursday.assignment.sort((a1, a2) => compareHours(a1, a2));
                a.friday.assignment.sort((a1, a2) => compareHours(a1, a2));
                a.saturday.assignment.sort((a1, a2) => compareHours(a1, a2));
                return a;
              })
            : [];

        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENTS, payload: data });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchAssignment = (id) => {
  return (dispatch, getState) => {
    api.assignment
      .get(id)
      .then(({ payload }) => {
        payload.rollUps =
          payload.rollUps && payload.rollUps.length > 0
            ? payload.rollUps.map((rollUp) => {
                rollUp.startTime = getTimeFromDate(rollUp.startTime);
                rollUp.endTime = getTimeFromDate(rollUp.endTime);
                return rollUp;
              })
            : [];
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENT, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const createAssignment = (params, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .post(params)
      .then(({ payload }) => {
        payload.startDate = formatDateTimeScheduleToString(payload.startTime);
        payload.endDate = formatDateTimeScheduleToString(payload.endTime);
        payload.title = payload.shift.code + ' - ' + payload.shift.name;
        payload.location = payload.shift.branch.code + ' - ' + payload.shift.branch.name;
        dispatch({ type: REDUX_STATE.assignment.CREATE_ASSIGNMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteAssignment = (id, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.assignment.DELETE_ASSIGNMENT, payload });
        // handleAfterDeleted();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const setEmptyAssignments = () => {
  return {
    type: REDUX_STATE.assignment.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyAssignment = () => {
  return {
    type: REDUX_STATE.assignment.EMPTY_ASSIGNMENT,
    payload: {},
  };
};

export const checkin = (id, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.assignment.DELETE_ASSIGNMENT, payload });
        // handleAfterDeleted();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

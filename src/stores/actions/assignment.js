import moment from 'moment';
import { getTimeFromDate, isBeforeTypeDate, parseLocalTime } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
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

export const fetchAssignments = (params, setLoading) => {
  return (dispatch, getState) => {
    api.assignment
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.startDate = a.startTime;
                a.endDate = a.endTime;
                a.shiftName = a.shift.name;
                a.shiftCode = a.shift.code;
                a.title = a.shift.code + ' - ' + a.shift.name;
                a.location = a.shift.branch.code + ' - ' + a.shift.branch.name;
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENTS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAssignments');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAssignmentsInDate = (params, onTotalChange, setLoading) => {
  return (dispatch, getState) => {
    api.assignment
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.shiftName = a.shift.name;
                a.shiftCode = a.shift.code;
                a.startCC = parseLocalTime(a.shift.startCC);
                a.endCC = parseLocalTime(a.shift.endCC);
                return a;
              })
            : [];
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENT_IN_A_DATE, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAssignmentsInDate');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
const compareHours = (a1, a2) => {
  return +a1.startCC.split(':')[0] - a2.startCC.split(':')[0];
};

export const fetchRollUpTable = (params, setLoading) => {
  let from = params?.from ? moment(params.from) : undefined;
  return (dispatch, getState) => {
    api.profile
      .getRollUpTable(params)
      .then(({ payload, total }) => {
        let data = [];
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                if (a.id === 1) {
                  total -= 1;
                  return a;
                }
                let x = {
                  id: a.id,
                  fullname: a.fullname,
                  avatar: a.avatar,
                  code: a.code,
                  sunday: {
                    assignment: [],
                    future: false,
                    date: from,
                  },
                  monday: {
                    assignment: [],
                    future: false,
                    date: from.clone().add(1, 'd'),
                  },
                  tuesday: {
                    assignment: [],
                    future: false,
                    date: from.clone().add(2, 'd'),
                  },
                  wednesday: {
                    assignment: [],
                    future: false,
                    date: from.clone().add(3, 'd'),
                  },
                  thursday: {
                    assignment: [],
                    future: false,
                    date: from.clone().add(4, 'd'),
                  },
                  friday: {
                    assignment: [],
                    future: false,
                    date: from.clone().add(5, 'd'),
                  },
                  saturday: {
                    assignment: [],
                    future: false,
                    date: from.clone().add(6, 'd'),
                  },
                };
                if (a?.assignments && a.assignments.length > 0)
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
                      shiftName: element.shift.name,
                      shiftCode: element.shift.code,
                      point: element.point !== 1 && element.point !== 0 ? element.point.toFixed(2) : element.point === 0 ? 0 : 1,
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
        payload = {
          payload: data,
          total: total,
        };
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENTS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchRollUpTable');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAssignment = (id, onTotalChange, setLoading) => {
  return (dispatch, getState) => {
    api.assignment
      .get(id)
      .then(({ payload }) => {
        payload.branch = payload.shift.branch.code + ' - ' + payload.shift.branch.name;
        payload.rollUps =
          payload.rollUps && payload.rollUps.length > 0
            ? payload.rollUps.map((rollUp) => {
                rollUp.startTime = getTimeFromDate(rollUp.startTime);
                rollUp.endTime = getTimeFromDate(rollUp.endTime);
                return rollUp;
              })
            : [];
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENT, payload });
        if (onTotalChange) onTotalChange(payload.rollUps.length);
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAssignment');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createAssignment = (params, handleReload, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .post(params)
      .then(({ payload }) => {
        if (handleReload) handleReload();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createAssignment');
      });
  };
};

export const deleteAssignment = (id, handleReload, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .delete(id)
      .then(({ payload }) => {
        if (handleReload) handleReload();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteAssignment');
      });
  };
};

export const setEmptyAssignments = () => {
  return {
    type: REDUX_STATE.assignment.EMPTY_VALUE,
    payload: {
      payload: [],
      total: 0,
    },
  };
};
export const setEmptyAssignment = () => {
  return {
    type: REDUX_STATE.assignment.EMPTY_ASSIGNMENT,
    payload: {},
  };
};
export const setEmptyAssignmentInADate = () => {
  return {
    type: REDUX_STATE.assignment.EMPTY_ASSIGNMENT_IN_A_DATE,
    payload: {},
  };
};
export const setEmptyPersonChart = () => {
  return {
    type: REDUX_STATE.assignment.SET_EMPTY_PERSON_CHART,
    payload: {},
  };
};
export const setEmptyStatisticChart = () => {
  return {
    type: REDUX_STATE.assignment.SET_EMPTY_STATISTIC_CHART,
    payload: {},
  };
};
export const checkin = (id, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.assignment.DELETE_ASSIGNMENT, payload });

        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'checkin');
      });
  };
};

export const fetchPersonChart = (params, t) => {
  return (dispatch, getState) => {
    api.assignment
      .getPersonChart(params)
      .then(({ payload }) => {
        let labels = [];

        let datasets = [
          {
            label: t('label.work_time'),
            backgroundColor: '#caf7e3',
            data: [],
          },
          {
            label: t('label.overtime_time'),
            backgroundColor: '#ffdcb8',
            data: [],
          },
          {
            label: t('label.leave_time'),
            backgroundColor: '#ddf3f5',
            data: [],
          },
          {
            label: t('label.absent_time'),
            backgroundColor: '#ffc1b6',
            data: [],
          },
        ];
        for (const [key, value] of Object.entries(payload)) {
          labels.push(t('label.month') + ' ' + key);
          datasets[0].data.push(value.work.toFixed(2));
          datasets[1].data.push(value.overtime.toFixed(2));
          datasets[2].data.push(value.leave.toFixed(2));
          datasets[3].data.push(value.absent.toFixed(2));
        }
        let rv = {
          labels: labels,
          datasets: datasets,
        };
        dispatch({ type: REDUX_STATE.assignment.SET_PERSON_CHART, payload: rv });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchPersonChart');
      });
  };
};

export const fetchStatisticChart = (params, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .getStatisticChart(params)
      .then(({ payload }) => {
        let data = [];
        data.push(payload.normal.length);
        data.push(payload.remote.length);
        data.push(payload.remote_overtime.length);
        data.push(payload.overtime.length);
        data.push(payload.leave.length);
        data.push(payload.absent.length);
        let rv = {
          data: data,
          payload: payload,
        };
        for (const [key, value] of Object.entries(payload)) {
          payload[key] =
            value.length > 0
              ? value.map((a) => {
                  a.profileCode = a.profile.code;
                  a.fullname = a.profile.fullname;
                  return a;
                })
              : [];
        }
        dispatch({ type: REDUX_STATE.assignment.SET_STATISTIC_CHART, payload: rv });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchStatisticChart');
      });
  };
};

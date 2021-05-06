import moment from 'moment';

export const getCurrentDate = () => {
  let thisDate = new Date();
  let date = thisDate.getDate();
  let month = thisDate.getMonth();
  return '' + [thisDate.getFullYear(), month + 1 > 9 ? month + 1 : '0' + (month + 1), date > 9 ? date : '0' + date].join('-');
};

export const isBeforeTypeHour = (startTime, endTime) => {
  return moment(startTime, 'HH:mm').isBefore(moment(endTime, 'HH:mm'));
};
export const isSameBeforeTypeDate = (startTime, endTime) => {
  return moment(startTime).isSameOrBefore(moment(endTime));
};
export const isBeforeTypeDate = (startTime, endTime) => {
  return moment(startTime).isBefore(moment(endTime));
};
export const formatDate = (value) => {
  if (!value) return '';
  let temp = moment(value);
  return temp.format('DD/MM/YYYY');
};

export const formatDateInput = (value) => {
  if (!value) return '';
  let temp = moment(value);
  return temp.format('YYYY-MM-DD');
};

export const formatTime = (time) => {
  // 10:00:00
  let temp = time.split(':');
  temp.pop();
  return temp.join(':');
};

export const getTimeFromDate = (date) => {
  // 10:00:00
  return moment(date).format('HH:mm');
};

export const formatDateTimeToString = (dateTime) => {
  // 	2021-04-25T08:30:00.000Z
  let temp = moment(dateTime);
  return temp.format('HH:mm:ss DD/MM/YYYY');
};

export const formatDateTimeScheduleToString = (dateTime) => {
  // 	2021-04-25T08:30:00.000Z
  let temp = moment(dateTime);
  return temp.format('YYYY-MM-DDTHH:ss:ss');
};

export const parseUTCTime = (time) => {
  // 	08:30:00
  let temp = time.split(':');
  let date = new Date();
  date.setHours(+temp[0]);
  date.setMinutes(+temp[1]);
  return moment(date).utc().format('HH:mm:00');
};
export const parseLocalTime = (time) => {
  // 	08:30:00
  let temp = time.split(':');
  let date = `2021-01-01T${temp[0]}:${temp[1]}:00.000Z`;
  return moment(date).format('HH:mm');
};

import moment from 'moment';

export const getDateInput = (dateTime) => (dateTime ? dateTime.split('T')[0] : '');
export const deleteTheLastZ = (time) => {
  return time.replace('Z', '');
};
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

export const formatTime = (time) => {
  // 10:00:00
  let temp = time.split(':');
  temp.pop();
  return temp.join(':');
};

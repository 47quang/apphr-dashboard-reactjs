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
export const formatDate = (value) => {
  return value ? value.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1') : '';
};

export const formatTime = (time) => {
  // 10:00:00
  let temp = time.split(':');
  temp.pop();
  return temp.join(':');
};

export const formatDateTime = (dateTime) => {
  // 	2021-04-25T08:30:00.000Z
  dateTime.replace('Z', '');
  let temp = moment(dateTime).utc().format('LT');
  // console.log(temp);
  return temp;
};

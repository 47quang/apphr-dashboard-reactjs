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

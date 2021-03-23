export const getDateInput = (dateTime) => dateTime.split('T')[0];
export const deleteTheLastZ = (time) => {
  return time.replace('Z', '');
};

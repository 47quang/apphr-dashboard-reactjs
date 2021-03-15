export const deCodeChecked = (_checked) =>
  _checked.reduce((acc, val, idx) => {
    if (parseInt(val) !== 0) acc.push(idx + '');
    return acc;
  }, []);
export const convertTimeWithoutSecond = (time) => {
  let timeTemp = time.split(':');
  return timeTemp.splice(0, 2).join(':');
};
export const convertBranchesId = (branches) => {
  return branches.map((value) => Number(value));
};

export const enCodeChecked = (operateLoop) => {
  return operateLoop.reduce((acc, val) => {
    acc[parseInt(val)] = 1;
    return acc;
  }, Array(7).fill(0));
};

export const convertTimeWithSecond = (time) => {
  const timeTemp = time.split(':');
  return timeTemp.length === 2 ? time + ':00' : time;
};
